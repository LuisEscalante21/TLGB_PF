import { useState } from 'react';
import { X, ArrowLeft, CreditCard } from 'lucide-react';
 
export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardHolder, setCardHolder] = useState('J. Smith');
 
  // Función para cambiar el método de pago
  const handlePaymentMethodChange = (method) => {
    // Si cambiamos de método, reiniciamos los campos de tarjeta
    if (method !== 'tarjeta') {
      setCardNumber('');
      setCardExpiry('');
      setCardCVC('');
      setCardHolder('');
    }
    setPaymentMethod(method);
  };
 
  // Función para formatear el número de tarjeta (espacio cada 4 dígitos)
  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 16); // Solo dígitos, máximo 16
    const formatted = input.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);
  };
 
  // Función para formatear la fecha de caducidad (MM/YY)
  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, '').substring(0, 4); // Solo dígitos, máximo 4
   
    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2);
    }
   
    setCardExpiry(input);
  };
 
  // Función para validar el CVC (solo 3 dígitos)
  const handleCVCChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 3); // Solo dígitos, máximo 3
    setCardCVC(input);
  };
 
  return (
    <div className="flex flex-col w-full h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center">
          <img
            src="/api/placeholder/48/48"
            alt="TLGB Logo"
            className="h-12 w-12"
          />
          <span className="text-lg font-bold ml-2 text-cyan-400">TLGB</span>
        </div>
        <button className="text-white">
          <X size={24} />
        </button>
      </div>
     
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Payment Information */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Completar Pago</h2>
         
          {/* Billing Address */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Dirección de facturación</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="bg-gray-800 p-2 rounded text-white"
              />
              <input
                type="text"
                placeholder="Dirección de facturación"
                className="bg-gray-800 p-2 rounded text-white"
              />
            </div>
          </div>
         
          {/* Payment Methods */}
          <div>
            <h3 className="text-sm font-medium mb-3">Métodos de pago</h3>
           
            {/* Credit Card Option */}
            <div
              className={`p-4 mb-4 rounded cursor-pointer border ${paymentMethod === 'tarjeta' ? 'border-orange-500' : 'border-gray-700'}`}
              onClick={() => handlePaymentMethodChange('tarjeta')}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-2 rounded">
                  <img src="https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-2006.png" alt="Credit Card Icon" className="h-6 w-6" />
                </div>
                <span className="font-medium">Tarjeta</span>
              </div>
             
              {paymentMethod === 'tarjeta' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400">Número de tarjeta</label>
                    <input
                      type="text"
                      placeholder="**** **** **** ****"
                      className="bg-gray-800 p-2 rounded w-full mt-1 text-white"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19} // 16 dígitos + 3 espacios
                    />
                  </div>
                 
                  <div>
                    <label className="text-xs text-gray-400">Titular de la tarjeta</label>
                    <input
                      type="text"
                      placeholder="Nombre del titular"
                      className="bg-gray-800 p-2 rounded w-full mt-1 text-white"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                    />
                  </div>
                 
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-gray-400">Fecha de caducidad</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="bg-gray-800 p-2 rounded w-full mt-1 text-white"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        maxLength={5} // MM/YY (5 caracteres)
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-400">CVV</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        className="bg-gray-800 p-2 rounded w-full mt-1 text-white"
                        value={cardCVC}
                        onChange={handleCVCChange}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
           
            {/* Cash Option */}
            <div
              className={`p-4 rounded flex items-center gap-3 cursor-pointer border ${paymentMethod === 'efectivo' ? 'border-orange-500' : 'border-gray-700'}`}
              onClick={() => handlePaymentMethodChange('efectivo')}
            >
              <div className="bg-white p-2 rounded">
                <img src="https://cdn-icons-png.flaticon.com/512/1041/1041971.png" alt="Cash Icon" className="h-6 w-6" />
              </div>
              <span className="font-medium">Efectivo</span>
            </div>
          </div>
        </div>
       
        {/* Right Side - Order Summary */}
        <div className="w-1/2 bg-gray-900 p-6 flex flex-col">
          <div className="bg-gray-800 rounded-lg p-6 mb-4 flex-1">
            <h3 className="text-lg font-semibold mb-6">Resumen</h3>
           
            {/* Products */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">NBA 2K25</p>
                  <p className="text-sm text-gray-400">Microsoft Store</p>
                </div>
                <p className="font-medium">$27.95</p>
              </div>
             
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">NFS Unbound</p>
                  <p className="text-sm text-gray-400">Microsoft Store</p>
                </div>
                <p className="font-medium">$45.00</p>
              </div>
            </div>
           
            {/* Total */}
            <div className="pt-4 border-t border-gray-700">
              <div className="flex justify-between mb-2">
                <p className="text-gray-400">IVA(0%):</p>
                <p>$0</p>
              </div>
             
              <div className="flex justify-between items-center mt-4">
                <p className="font-bold">TOTAL</p>
                <p className="font-bold text-xl">$34.54</p>
              </div>
            </div>
          </div>
         
          {/* Action Buttons */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg w-full mb-4">
            Realizar Venta
          </button>
         
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <ArrowLeft size={16} />
            <span>Continuar comprando</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 