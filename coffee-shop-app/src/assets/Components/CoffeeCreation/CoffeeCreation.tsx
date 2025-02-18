import React, { useEffect, useState } from 'react';
import './CoffeeCreation.css';


//this interface it is used to tell react what kind of datatype are we pulling
interface Coffee {
    id: number;
    name: string;
    quantity: number;
    description: string;
  }

function CoffeeCreation() {
   
    const [coffeeMenu, setCoffeeMenu] = useState<Coffee[]>([]);
    const [formData, setFormData] = useState({ name: '', quantity: '', description: '', id: '' });
     //fetch all the coffees
    useEffect(() => {
        fetch('http://localhost:8081/api/coffee')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch coffee data');
            }
            return response.json();
          })
          .then((data) => setCoffeeMenu(data))
          .catch((error) => console.error('Error:', error));
      }, []);
//handle changes
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
      };// Handle create/edit coffee
      const handleCreateCoffee = (e: React.FormEvent) => {
        e.preventDefault();
      
        const coffeeData = {
          name: formData.name,
          quantity: parseInt(formData.quantity, 10),
          description: formData.description,
        };
      
        // Check if the coffee name already exists
        const existingCoffee = coffeeMenu.find((coffee) => coffee.name === formData.name);
      
        if (existingCoffee) {
          // If coffee name exists, update the coffee (PUT request)
          fetch(`http://localhost:8081/api/coffee/${existingCoffee.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coffeeData),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to update coffee');
              }
              return response.json();
            })
            .then((updatedCoffee) => {
              // Update the coffee in the menu
              setCoffeeMenu((prev) =>
                prev.map((coffee) => (coffee.id === updatedCoffee.id ? updatedCoffee : coffee))
              );
              setFormData({ name: '', quantity: '', description: '', id: '' });
            })
            .catch((error) => console.error('Error:', error));
        } else {
          // If coffee name doesn't exist, create a new coffee (POST request)
          fetch('http://localhost:8081/api/coffee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coffeeData),
            credentials: 'include',
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to create coffee');
              }
              return response.json();
            })
            .then((newCoffee) => {
              setCoffeeMenu((prev) => [...prev, newCoffee]);
              setFormData({ name: '', quantity: '', description: '', id: '' });
            })
            .catch((error) => console.error('Error:', error));
        }
      };
  // Handle delete coffee
  const handleDeleteCoffee = (e: React.FormEvent) => {
    e.preventDefault();

    const coffeeId = parseInt(formData.id, 10);

    fetch(`http://localhost:8081/api/coffee/${coffeeId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete coffee');
        }
        setCoffeeMenu((prev) => prev.filter((coffee) => coffee.id !== coffeeId));
        setFormData({ name: '', quantity: '', description: '', id: '' });
      })
      .catch((error) => console.error('Error:', error));
  };

  // It populate the form
  const handleCardClick = (coffee: Coffee) => {
    setFormData({
      name: coffee.name,
      quantity: coffee.quantity.toString(),
      description: coffee.description,
      id: coffee.id.toString(),
    });
  };

  return (
    <main>
    
    <div className="container min-vh-100 d-flex justify-content-center align-items-center new_font col-md-6">
        <div className="row gy-3">
          <h1>Current Coffee Menu</h1>
          {coffeeMenu.map((coffee) => ( 
            <div className="col-md-4" key={coffee.id} onClick={() => handleCardClick(coffee)}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{coffee.name}</h5>
                  <p className="card-quantity">Quantity: {coffee.quantity}</p>
                  <p className="card-text">{coffee.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
      <div className="container min-vh-100 d-flex justify-content-center">
        <form>
          <h1 className="new_font">Add/Delete Coffee from Menu</h1>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Coffee Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="id" className="form-label">Coffee ID (for deletion)</label>
            <input
              type="number"
              className="form-control"
              id="id"
              value={formData.id}
              onChange={handleInputChange}
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={handleCreateCoffee}>
            Create/Edit Coffee
          </button>

          <button type="button" className="btn btn-danger" onClick={handleDeleteCoffee}>
            Delete Coffee
          </button>
        </form>
      </div>

</main>
  )
}

export default CoffeeCreation
