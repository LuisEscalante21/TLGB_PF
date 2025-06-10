import { useState } from 'react';
import { X, ArrowLeft, CreditCard, DollarSign } from 'lucide-react';
import './PaymentScreen.css';

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardHolder, setCardHolder] = useState('J. Smith');
  const [fullName, setFullName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  // Función para cambiar el método de pago
  const handlePaymentMethodChange = (method) => {
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
    const input = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = input.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);
  };

  // Función para formatear la fecha de caducidad (MM/YY)
  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, '').substring(0, 4);
    
    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2);
    }
    
    setCardExpiry(input);
  };

  // Función para validar el CVC (solo 3 dígitos)
  const handleCVCChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCardCVC(input);
  };

  return (
    <div className="payment-container">
      {/* Header */}
      {/* Main Content */}
      <div className="payment-main-content">
        {/* Left Side - Payment Information */}
        <div className="payment-left-panel">
          <h2 className="payment-title">Completar Pago</h2>
          
          {/* Billing Address */}
          <div>
            <h3 className="payment-section-title">Dirección de facturación</h3>
            <div className="payment-input-grid">
              <input
                type="text"
                placeholder="Nombre completo"
                className="payment-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Dirección de facturación"
                className="payment-input"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </div>
          </div>
          
          {/* Payment Methods */}
          <div>
            <h3 className="payment-section-title">Métodos de pago</h3>
            
            {/* Credit Card Option */}
            <div
              className={`payment-option ${paymentMethod === 'tarjeta' ? 'payment-option-active' : 'payment-option-inactive'}`}
              onClick={() => handlePaymentMethodChange('tarjeta')}
            >
              <div className="payment-option-header">
                <div className="payment-icon payment-icon-card">
                  <CreditCard size={24} color="white" />
                </div>
                <span style={{fontWeight: '500'}}>Tarjeta de Crédito/Débito</span>
              </div>
              
              {paymentMethod === 'tarjeta' && (
                <div className="payment-card-fields">
                  <div>
                    <label className="payment-label">Número de tarjeta</label>
                    <input
                      type="text"
                      placeholder="**** **** **** ****"
                      className="payment-input"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                    />
                  </div>
                  
                  <div>
                    <label className="payment-label">Titular de la tarjeta</label>
                    <input
                      type="text"
                      placeholder="Nombre del titular"
                      className="payment-input"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                    />
                  </div>
                  
                  <div className="payment-card-fields-row">
                    <div className="payment-card-fields-row-item">
                      <label className="payment-label">Fecha de caducidad</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="payment-input"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        maxLength={5}
                      />
                    </div>
                    <div className="payment-card-fields-row-item">
                      <label className="payment-label">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="payment-input"
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
              className={`payment-option ${paymentMethod === 'efectivo' ? 'payment-option-active' : 'payment-option-inactive'}`}
              onClick={() => handlePaymentMethodChange('efectivo')}
            >
              <div className="payment-option-header">
                <div className="payment-icon payment-icon-cash">
                  <DollarSign size={24} color="white" />
                </div>
                <span style={{fontWeight: '500'}}>Efectivo</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Order Summary */}
        <div className="payment-right-panel">
          <div className="payment-summary-container">
            <h3 className="payment-summary-title">Resumen del Pedido</h3>
            
            {/* Products */}
            <div className="payment-products">
              <div className="payment-product-item">
                <div className="payment-product-info">
                  <h4>NBA 2K25</h4>
                  <p>Microsoft Store</p>
                </div>
                <p className="payment-product-price">$27.95</p>
              </div>
              
              <div className="payment-product-item">
                <div className="payment-product-info">
                  <h4>NFS Unbound</h4>
                  <p>Microsoft Store</p>
                </div>
                <p className="payment-product-price">$45.00</p>
              </div>
            </div>
            
            {/* Total */}
            <div className="payment-total-section">
              <div className="payment-total-row">
                <p>Subtotal:</p>
                <p>$72.95</p>
              </div>
              
              <div className="payment-total-row">
                <p>IVA (0%):</p>
                <p>$0.00</p>
              </div>
              
              <div className="payment-total-final">
                <p className="payment-total-final-text">TOTAL</p>
                <p className="payment-total-final-price">$72.95</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <button className="payment-pay-button">
            Realizar Pago
          </button>
          
          <button className="payment-continue-button">
            <ArrowLeft size={16} />
            <span>Continuar comprando</span>
          </button>
        </div>
      </div>
    </div>
  );
}