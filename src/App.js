
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
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
  return(
    <>
      <div className="add-form">
        <h3>What ingredients do you need?</h3>

      </div>
    
    </>
  )
}

function PackingList() {
  return(
    <div className="list">

    </div>
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