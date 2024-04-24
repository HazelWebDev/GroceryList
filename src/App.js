import { useState } from "react"

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items)=> [...items, item])
  }

  function handleDeleteItem(id) {
    setItems(items=>items.filter(item=>item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? 
      {...item, checked: !item.checked } : item))
  }

  return(
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems}/>
        <CheckList 
          items={items} 
          onDeleteItem={handleDeleteItem} 
          onToggleItem={handleToggleItem} />
        <Stats items={items} />
      </div>
    </>
  )
};

function Logo() {
  return(
    <h1>What's Cookin'?</h1>
  )
}

function Form({onAddItems}) {
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
    onAddItems(newItem);

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

function CheckList({ items, onDeleteItem, onToggleItem }) {
  return(
    <div className="list">
      <ul>
      {items.map((item) => (
      <Item 
      item={item} 
      onDeleteItem={onDeleteItem}  
      onToggleItem={onToggleItem}
      key={item.id} 
      />
      ))}
    </ul>
   </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return(
    <li>
      <input type="checkbox" 
      value={item.checked} 
      onChange={() => onToggleItem(item.id)}/>
      <span style={item.checked ? {textDecoration: 'line-through'} : {}}>
       {item.measurement} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}


function Stats({ items }) {
  
  if(!items.length) return (
    <p className="stats">
      <em>Start adding ingredients to your grocery list</em>
    </p>
  )

  const numItems = items.length;
  const numChecked = items.filter((item) => item.checked).length;
  const percentage = Math.round((numChecked / numItems) * 100);

  return(
    <footer className="stats">
      <em>
        {percentage === 100 ? 
        'You have all the ingredients! Ready to cook?' :
        `You've got ${numItems} items on the grocery list, 
        and you've got ${numChecked} ingredients already (${percentage}%)`}
      </em>
    </footer>
  )
}