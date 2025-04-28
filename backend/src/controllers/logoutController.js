const logoutController = {};

// I N S E R T
logoutController.logout = async (req, res) => {
  // Borrar authToken (asegurando mismas opciones que al crear)
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });

  // Borrar userData (especial atención al encoding)
  res.clearCookie("userData", {
    httpOnly: false,  // Debe coincidir con la creación
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });

  return res.json({message: "Se cerro sesion"});
  };

export default logoutController;