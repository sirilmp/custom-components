import Select from "./components/Select";

const App = () => {
  const options = [
    "Alappuzha",
    "Ernakulam",
    "Kozhikode",
    "Palakkad",
    "Kollam",
    "Kannur",
    "Kasaragod",
    "Idukki",
    "Kottayam",
    "Thrissur",
    "Pathanamthitta",
    "Malappuram",
    "Wayanad",
    "Thiruvananthapuram",
  ];

  const handleSelect = (selectedOption) => {
    console.log(`Selected option: ${selectedOption}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-800 flex flex-1 justify-center items-center">
      <Select
        options={options}
        onSelect={handleSelect}
        placeholder="select a option"
        notfound="notfound"
      />
    </div>
  );
};

export default App;
