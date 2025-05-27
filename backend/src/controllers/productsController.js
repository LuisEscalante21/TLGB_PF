const productsController = {};
import productsModel from "../models/Products.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import { v2 as cloudinary } from "cloudinary"
import { config }  from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const platformConsoleMap = {
  PlayStation: ['PS5', 'PS4'],
  Xbox: ['Xbox Series X-S', 'Xbox One', 'Xbox 360'],
  Nintendo: ['Switch'],
  PC: ['Windows'],
};

// S E L E C T
productsController.getProducts = async (req, res) => {
  try {
    let page = parseInt(req.params.page) || 1; // Página actual (por defecto 1)
    const itemsPerPage = 10; // Número de productos por página
    const  type  = req.params.type; // Obtener el tipo de producto desde query params

    // Validar que la página sea un número válido
    if (isNaN(page) || page < 1) {
      return res.status(400).json({
        status: "error",
        message: "El número de página no es válido"
      });
    }

    // Construir el filtro según el tipo de producto
    const filter = {};
    if (type) {
      // Validar que el tipo sea uno de los permitidos
      const validTypes = ['Juego', 'Tarjeta-regalo', 'Suscripcion'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          status: "error",
          message: "Tipo de producto no válido. Opciones: Juego, Tarjeta-regalo, Suscripcion"
        });
      }
      filter.type = type;
    }

    // Opciones de paginación
    const options = {
      page: page,
      limit: itemsPerPage,
      sort: { _id: 1 } // Ordenar por _id ascendente
    };

    // Consulta para obtener productos paginados
    const result = await productsModel.paginate(filter, options);

    // Verificar si hay productos
    if (result.docs.length === 0) {
      const message = type 
        ? `No hay productos del tipo '${type}' disponibles` 
        : "No hay productos disponibles";
      
      return res.status(404).json({
        status: "error",
        message: message
      });
    }

    // Devolver el resultado
    return res.status(200).json({
      status: "success",
      page: result.page,
      itemsPerPage: result.limit,
      total: result.totalDocs,
      pages: result.totalPages,
      products: result.docs,
      currentType: type || 'Todos' // Indicar el tipo filtrado
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor"
    });
  }
};

productsController.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validar que el ID tenga formato válido (opcional)
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        status: "error",
        message: "ID de producto no válido"
      });
    }

    // Buscar el producto en la base de datos
    const product = await productsModel.findById(productId)
      .populate({
        path: 'idSupplier',
        select: 'name image rating' // Puedes incluir más campos si necesitas
      })
      .populate({
        path: 'platforms',
        select: 'name icon' // Campos de las plataformas
      })
      .lean(); // Convertir a objeto JavaScript

    // Si no se encuentra el producto
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado"
      });
    }

    // Formatear la respuesta según necesidades
    const response = {
      status: "success",
      product: {
        ...product,
        // Puedes agregar campos calculados o formateados aquí
        finalPrice: product.discount > 0 
          ? product.price * (1 - product.discount / 100)
          : product.price
      }
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Error al buscar producto por ID:', error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al buscar el producto",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

productsController.getProductsByPlatform = async (req, res) => {
  try {
    const platformName = req.params.platform;
    const page = parseInt(req.params.page) || 1;
    const limit = 10;
    const type  = req.params.type; // Nuevo parámetro para filtrar por tipo

    const platformConsoleMap = productsModel.getPlatformConsoleMap()

    // Validaciones
    if (!platformConsoleMap[platformName]) {
      return res.status(400).json({
        status: "error",
        message: `Plataforma no válida. Opciones: ${Object.keys(platformConsoleMap).join(', ')}`,
        validPlatforms: Object.keys(platformConsoleMap)
      });
    }

    if (isNaN(page) || page < 1) {
      return res.status(400).json({
        status: "error",
        message: "Número de página inválido"
      });
    }

    // Validar tipo si fue proporcionado
    if (type && !['Juego', 'Tarjeta-regalo', 'Suscripcion'].includes(type)) {
      return res.status(400).json({
        status: "error",
        message: "Tipo de producto no válido. Opciones: Juego, Tarjeta-regalo, Suscripcion"
      });
    }

    // Construir filtro
    const filter = {
      "platforms.name": platformName
    };


    // Agregar filtro por tipo si existe
    if (type) {
      filter.type = type;
    }

    // Consulta con paginación
    const result = await productsModel.paginate(filter, {
      page,
      limit,
      sort: { _id: -1 },
      populate: {
        path: 'idSupplier',
        select: 'name'
      }
    });

    // Manejar resultados vacíos
    if (result.docs.length === 0) {
      const message = type
        ? `No se encontraron productos de tipo ${type} para ${platformName}`
        : `No se encontraron productos para ${platformName}`;
      
      return res.status(404).json({
        status: "error",
        message: message
      });
    } 

    // Formatear respuesta
    const formattedProducts = result.docs.map(product => {
      const productData = product.toObject();
      productData.platforms = product.platforms.filter(
        p => p.name === platformName
      );
      return productData;
    });

    if (formattedProducts.length === 0) {
      return res.status(404).json({
        status: "success",
        message: `No se encontraron productos para ${platformName}`,
        products: []
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      status: "success",
      currentPage: result.page,
      totalPages: result.totalPages,
      totalItems: result.totalDocs,
      platform: platformName,
      products: formattedProducts
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      status: "error",
      message: "Error en el servidor"
    });
  }
};

productsController.getProductsByPlatformAndConsole = async (req, res) => {
  try {
    const platformName = req.params.platform;
    const consoleName = req.params.console;
    const page = parseInt(req.params.page) || 1;
    const limit = 10;
    const type  = req.params.type; // Nuevo parámetro para filtrar por tipo

    // Validaciones
    if (!platformName || !consoleName) {
      return res.status(400).json({
        status: "error",
        message: "Debe especificar tanto la plataforma como la consola"
      });
    }

    // Validación de tipo (ahora obligatorio)
    if (type && !['Juego', 'Tarjeta-regalo', 'Suscripcion'].includes(type)) {
      return res.status(400).json({
        status: "error",
        message: "Tipo de producto no válido. Opciones: Juego, Tarjeta-regalo, Suscripcion"
      });
    }

    if (isNaN(page) || page < 1) {
      return res.status(400).json({
        status: "error",
        message: "Número de página inválido"
      });
    }

    // Construir filtro base
    const filter = {
      "platforms.name": { $regex: new RegExp(platformName, 'i') },
      "platforms.consoles.name": { $regex: new RegExp(consoleName, 'i') },
      type: type // Tipo ahora es obligatorio y siempre está en el filtro
    };


    // Consulta con paginación
    const result = await productsModel.paginate(
      filter,
      {
        page,
        limit,
        sort: { _id: -1 },
        populate: {
          path: 'idSupplier',
          select: 'name -_id'
        }
      }
    );

    // Formatear respuesta
    const formattedProducts = result.docs.map(product => {
      const productObj = product.toObject();
      
      // Filtrar plataformas y consolas que coincidan
      const filteredPlatforms = product.platforms
        .filter(p => p.name.toLowerCase().includes(platformName.toLowerCase()))
        .map(p => ({
          ...p.toObject(),
          consoles: p.consoles.filter(c => 
            c.name.toLowerCase().includes(consoleName.toLowerCase()))
        }))
        .filter(p => p.consoles.length > 0); // Solo plataformas con consolas que coinciden
      
      return {
        ...productObj,
        platforms: filteredPlatforms,
        supplierName: product.idSupplier?.name || 'Desconocido'
      };
    });

    // Manejar resultados vacíos
    if (formattedProducts.length === 0) {
      const message = type
        ? `No se encontraron productos de tipo ${type} para ${platformName} y consola ${consoleName}`
        : `No se encontraron productos para ${platformName} y consola ${consoleName}`;
      
      return res.status(404).json({
        status: "success",
        message: message,
        products: []
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      status: "success",
      platform: platformName,
      console: consoleName,
      currentType: type,
      currentPage: result.page,
      totalPages: result.totalPages,
      totalProducts: result.totalDocs,
      products: formattedProducts
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      status: "error",
      message: "Error en el servidor"
    });
  }
};

productsController.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const itemsPerPage = 10;

    const options = {
      page,
      limit: itemsPerPage,
      sort: { _id: 1 },
      populate: [
        { path: 'idSupplier', select: 'name' },
        { path: 'platforms', select: 'name consoles' }
      ]
    };

    const result = await productsModel.paginate({}, options);

    if (result.docs.length === 0) {
      return res.status(404).json({
        status: "success",
        message: "No hay productos disponibles",
        products: []
      });
    }

    return res.status(200).json({
      status: "success",
      page: result.page,
      itemsPerPage: result.limit,
      total: result.totalDocs,
      pages: result.totalPages,
      products: result.docs
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor"
    });
  }
};

productsController.uploadProductImages = async (req, res) => {
  try {
    // Obtener archivos subidos
    const files = req.files;
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Obtener parámetro de consulta para determinar el modo (agregar o reemplazar)
    const mode = req.query.mode || 'add'; // Por defecto agrega

    // Eliminar imágenes existentes si está en modo reemplazo
    const product = await productsModel.findById(req.params.id);
    if (mode === 'replace' && product.images.length > 0) {
      // Eliminar archivos físicos (excepto default.png)
      await Promise.all(
        product.images.map(async (img) => {
          if (img.storedName !== 'default.png') {
            const filePath = path.join(__dirname, '../uploads/products', img.storedName);
            if (fs.existsSync(filePath)) {
              await fs.promises.unlink(filePath);
            }
          }
        })
      );
    }

    // Procesar nuevas imágenes (convertir objeto files a array)
    const fileArray = Object.values(files).map(fileObj => fileObj[0]);
    
    const uploadedImages = await Promise.all(fileArray.map(async (file) => {
      if (!file) return null; // En caso de que algún campo fileX no esté presente
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      const storedName = `product-${uniqueSuffix}${extension}`;
      const filePath = path.join(__dirname, '../uploads/products', storedName);

      await fs.promises.rename(file.path, filePath);

      return {
        originalName: file.originalname,
        storedName: storedName,
        path: `/uploads/products/${storedName}`,
        uploadedAt: new Date()
      };
    }));

    // Filtrar posibles valores nulos (de campos fileX no enviados)
    const filteredImages = uploadedImages.filter(img => img !== null);

    // Determinar operación según el modo
    let updateOperation;
    if (mode === 'replace') {
      // Reemplazar todas (excepto default si es el único)
      const isOnlyDefault = product.images.length === 1 && product.images[0].storedName === 'default.png';
      updateOperation = {
        $set: { 
          images: isOnlyDefault ? 
            [{ ...product.images[0] }, ...filteredImages] : 
            filteredImages 
        }
      };
    } else {
      // Agregar nuevas imágenes
      updateOperation = { $push: { images: { $each: filteredImages } } };
    }

    const updatedProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      updateOperation,
      { new: true }
    );

    res.json({
      status: 'success',
      message: `${filteredImages.length} imagen(es) ${mode === 'replace' ? 'reemplazadas' : 'agregadas'}`,
      images: updatedProduct.images
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ 
      status: 'error',
      message: "Error al procesar imágenes",
      error: error.message 
    });
  }
};

productsController.getAllImages = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    // Mapear las imágenes para enviar al frontend
    const images = product.images.map(img => ({
      id: img._id,
      originalName: img.originalName,
      url: `/api/products/media/${img.storedName}`,
      fileName: img.storedName,
      uploadedAt: img.uploadedAt
    }));
    
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Devolver archivos multimedia imagenes
productsController.media = async (req, res) => {
  try {
    const file = req.params.file;
    
    // 1. Validación básica del nombre de archivo
    if (!file || file === 'undefined') {
      return res.status(400).json({
        status: "error",
        message: "Nombre de archivo no válido"
      });
    }

    // 2. Construir ruta segura
    const safeFile = path.normalize(file).replace(/^(\.\.(\/|\\|$))+/g, '');
    const filePath = path.join(__dirname, '../uploads/products', safeFile);

    // 3. Verificar existencia del archivo
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`Archivo no encontrado: ${filePath}`);
        return res.status(404).json({
          status: "error",
          message: "Imagen no encontrada",
          requestedFile: file // Para depuración
        });
      }

      // 4. Enviar el archivo con manejo de errores
      res.sendFile(filePath, (error) => {
        if (error) {
          console.error("Error al enviar archivo:", {
            filePath,
            error: error.message
          });
          return res.status(500).json({
            status: "error",
            message: "Error al cargar la imagen"
          });
        }
      });
    });
  } catch (error) {
    console.error("Error en media controller:", {
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor"
    });
  }
};

// I N S E R T
productsController.insertProducts = async (req, res) => {
  try {
    const { name, type, platforms, description, genres, releaseDate, idSupplier, initialStock } = req.body;

    if (!platforms || !Array.isArray(platforms)) {
      return res.status(400).json({
        status: "error",
        message: "El campo platforms es requerido y debe ser un array"
      });
    }

    // Validate platforms and consoles
    const isValid = platforms.every(platform => {
      if (!platform || !platform.name || !platform.consoles) return false;
      
      const validConsoles = platformConsoleMap[platform.name];
      if (!validConsoles) return false;

      return platform.consoles.every(console => {
        return console && console.name && validConsoles.includes(console.name);
      });
    });

    if (!isValid) {
      return res.status(400).json({
        status: "error",
        message: "Combinación plataforma/consola no válida",
        validPlatforms: Object.keys(platformConsoleMap),
        validConsoles: platformConsoleMap
      });
    }

    // Handle image uploads
    const images = [];
    if (req.files && req.files.length > 0) {
      await Promise.all(req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
          allowed_formats: ["jpg", "png", "jpeg"]
        });
        images.push({
          url: result.secure_url,
          publicId: result.public_id,
          storedName: result.original_filename
        });
      }));
    }

    const newProduct = new productsModel({
      name, 
      type, 
      platforms, 
      description, 
      genres, 
      releaseDate, 
      idSupplier,
      images
    });

    await newProduct.save();

    // Create initial stock records if provided
    if (initialStock && Array.isArray(initialStock)) {
      await Promise.all(initialStock.map(async (stockItem) => {
        const newStock = new stockModel({
          idBranch: stockItem.idBranch,
          idProduct: newProduct._id,
          Stock: stockItem.quantity
        });
        await newStock.save();
      }));
    }

    res.status(200).json({ 
      status: "success",
      message: "Producto guardado exitosamente",
      data: {
        product: newProduct,
        stock: initialStock || []
      } 
    });

  } catch (error) {
    console.error("Error al insertar producto:", error);
    res.status(500).json({ 
      status: "error",
      message: "Error al guardar el producto",
      error: error.message 
    });
  }
};

productsController.getProductWithStock = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    const stock = await stockModel.find({ idProduct: product._id }).populate('idBranch');
    
    res.status(200).json({
      status: "success",
      data: {
        product,
        stock
      }
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// D E L E T E
productsController.deleteProducts = async (req, res) => {
  await productsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "product deleted" });
};

// U P D A T E
productsController.updateProducts = async (req, res) => {
  const { name, type, platforms, description, genres, releaseDate, idSupplier } = req.body;
  const updateProduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    {name, type, platforms, description, genres, releaseDate, idSupplier},
    { new: true }
  );

  if(!updateProduct){
    res.json({ message: "product not found" });
  }else {
    res.json({ message: "product updated" });
  }
  
};

export default productsController;