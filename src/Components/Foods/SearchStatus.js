const SearchStatus = (props) => {
  //console.log(props.ss);
  return (
    <div
      style={{
        backgroundColor: "transparent",
        minWidth: "10rem",
        position: "absolute",
        zIndex: 10,
      }}
    >
      {props.ss.ele}
    </div>
  );
};

export default SearchStatus;
//style={{ marginLeft: "0.5rem" }}
