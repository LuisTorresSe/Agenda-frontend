import "./App.css";
import { useState } from "react";
import { deleteUser, getUserAll, postUser } from "./Api";

function App() {
  const [list, setList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="App">
      <h2>agenda</h2>
      <Search setIsSearch={setIsSearch} setList={setList} />
      {isSearch ? (
        <List list={list} setList={setList} />
      ) : (
        <p>No hay informacion que mostrar</p>
      )}
      <FormUser setList={setList} />
    </div>
  );
}

const Search = ({ setSearch, search, setIsSearch, setList }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleChangeCheckbox = (event) => {
    if (event.target.checked) {
      getUserAll().then((res) => setList(res));
    }
    setIsSearch(event.target.checked);
  };
  const handleSearchText = (event) => {
    const statusSearch = event.target.value.length === 0 ? false : true;
    setSearch(event.target.value);
    setIsSearch(statusSearch);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleSearchText} value={search} />
      <br />
      <label id="show">
        mostrar todos
        <input type="checkbox" name="show" onChange={handleChangeCheckbox} />
      </label>
    </form>
  );
};

const List = ({ list, setList }) => {
  return (
    <div>
      {list.map((user) => (
        <User
          name={user.name}
          number={user.number}
          key={user.id}
          id={user.id}
          setList={setList}
        />
      ))}
    </div>
  );
};
const User = ({ name, number, id, setList }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{number}</p>
      <BtnDelete id={id} setList={setList} />
    </div>
  );
};

const BtnDelete = ({ id, setList }) => {
  const handleDelete = (e) => {
    deleteUser(id)
      .then((res) => console.log(res))
      .then(() => {
        return getUserAll();
      })
      .then((users) => setList(users))
      .catch((errors) => console.error(errors));
  };
  return <button onClick={handleDelete}>Eliminar</button>;
};

const FormUser = ({ setList }) => {
  const [inputValues, setInputValues] = useState({ name: "", number: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(inputValues)
      .then((res) => console.log(res))
      .then(() => {
        return getUserAll();
      })
      .then((users) => setList(users))
      .catch((error) => console.error(error));
  };

  const handleChangeInput = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New User</h3>
      <div>
        <label htmlFor="name"> Name </label>
        <input type="text" id="name" onChange={handleChangeInput} name="name" />
      </div>
      <div>
        <label htmlFor="number"> Number </label>
        <input
          type="number"
          id="number"
          onChange={handleChangeInput}
          name="number"
        />
      </div>
      <input type="submit" value="insert new user" />
    </form>
  );
};

export default App;
