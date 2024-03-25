import { useState } from "react"


const initialItems = [
  { id: 1, description: "Rice", measurement: "1 cup", stocked: true },
  { id: 2, description: "Broccoli", measurement: "1 cup", stocked: false },
];

export default function App() {
  return(
    <>
      <div className="app">
        <Logo />
        <Form />
        <PackingList />
        <Stats />
      </div>
    </>
  )
};

function Logo() {
  return(
    <h1>What's Cookin'?</h1>
  )
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {description, 
      quantity, 
      packed: false, 
      id: Date.now() 
    };
    //clear the box after something is added

    setDescription("");
    setQuantity(1);
  }

  return(
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What ingredients do you need?</h3>
        <select 
          value={quantity} 
          onChange={(e)=> setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input 
          type="text" 
          placeholder="Ingredient" 
          value={description}  
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  )
}

function PackingList() {
  return(
    <div className="list">
      <ul>
      {initialItems.map((item) => (
      <Item item={item} key={item.id} />
      ))}
    </ul>
   </div>
  )
}

function Item({ item }) {
  return(
    <li>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
       {item.measurement} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}


function Stats() {
  return(
    <footer className="stats">
      You've got X items on the grocery list, 
      and you've got X items already (X%)
    </footer>
  )
}