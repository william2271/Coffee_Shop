import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css'
//define datatupe
interface Coffee {
    id: number;
    name: string;
    quantity: number;
    description: string;
    selectedQuantity?: number; 
  }
function Menu() {
    const [coffees, setCoffees] = useState<Coffee[]>([]);
    const [showAlert, setShowAlert] = useState(false); // State for alert visibility
    const [alertMessage, setAlertMessage] = useState('');

    // Fetch coffee data from the API when the component mounts
    useEffect(() => {
      axios.get('http://localhost:8081/api/coffee')
        .then(response => {
          setCoffees(response.data); 
        })
        .catch(error => console.error('Error fetching coffee menu:', error));
    }, []);


  // Get the coffee object by its ID 
  const getCoffeeById = (coffeeId: number): Coffee | undefined => {
    return coffees.find(coffee => coffee.id === coffeeId);
  };

  // Handle placing an order
  const handleOrder = (coffeeId: number, quantity: number) => {
    const coffee = getCoffeeById(coffeeId);
    if (coffee && quantity <= coffee.quantity) {
      // Send the update request to the backend to reduce the available quantity
      axios.patch(`http://localhost:8081/api/coffee/${coffeeId}/quantity`, quantity, {
        headers: {
          'Content-Type': 'application/json',  
        }
      })
        .then((response) => {
          // After successfully updating, update the state to reflect the new quantity
          setCoffees(coffees.map((coffee) =>
            coffee.id === coffeeId ? { ...coffee, quantity: coffee.quantity - quantity } : coffee
          ));
  
          // Show success alert
          setAlertMessage(`Successfully ordered ${quantity} ${coffee.name}`);
          setShowAlert(true);
  
          // Hide alert after 3 seconds
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        })
        .catch((error) => {
          // Handle error
          console.error('Error updating coffee quantity:', error.response || error.message);
          setAlertMessage('Failed to place the order. Please try again.');
          setShowAlert(true);
  
          // Hide alert after 3 seconds
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        });
    } else {
      setAlertMessage('Not enough quantity available to fulfill the order');
      setShowAlert(true);
  
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

    // prevents the input to be higher than the current stock

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, coffeeId:number) => {
    const value = Math.min(Math.max(Number(e.target.value), 1), getCoffeeById(coffeeId)?.quantity || 1); 
    updateQuantity(coffeeId, value);
  };
// Handle incrementing the quantity
const handleIncrement = (coffeeId: number, currentValue: number) => {
    const availableQuantity = getCoffeeById(coffeeId)?.quantity || 1;
    const newValue = Math.min(currentValue + 1, availableQuantity);
    updateQuantity(coffeeId, newValue);
  };

  // Handle decrementing the quantity
  const handleDecrement = (coffeeId: number, currentValue: number) => {
    const newValue = Math.max(currentValue - 1, 1);
    updateQuantity(coffeeId, newValue);
  };

  // Update the selected quantity in the state
  const updateQuantity = (coffeeId: number, newValue: number) => {
    setCoffees(coffees.map((coffee) =>
      coffee.id === coffeeId ? { ...coffee, selectedQuantity: newValue } : coffee
    ));
  };
  return (
    <div className="menu">
    {showAlert && (
      <div className="alert alert-info" role="alert">
        {alertMessage}
      </div>
    )}

    <div className="container min-vh-100 d-flex justify-content-center align-items-center new_font col-md-6">
      <div className="row gy-3">
        <h1>Current Coffee Menu</h1>
        {coffees.map((coffee) => (
          <div className="col-md-4" key={coffee.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{coffee.name}</h5>
                <p className="card-quantity">Quantity: {coffee.quantity}</p>
                <p className="card-text">{coffee.description}</p>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleDecrement(coffee.id, coffee.selectedQuantity || 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control form-control-sm text-center"
                    value={coffee.selectedQuantity || 1} // Handle the quantity input here
                    min="1"
                    onChange={(e) => handleQuantityChange(e, coffee.id)}
                  />
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleIncrement(coffee.id, coffee.selectedQuantity || 1)}
                  >
                    +
                  </button>
                  <button onClick={() => handleOrder(coffee.id, coffee.selectedQuantity || 1)}>Order</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Menu
