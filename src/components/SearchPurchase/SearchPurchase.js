import React, { useState, useEffect, useRef } from "react";
// import classes from "./SearchPurchase.module.css";

import Input from "../../UI/Input";

const SearchPurchase = React.memo((props) => {
  const { filtered } = props;
  const [inputSearch, setInputSearch] = useState({
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Enter searching name",
      id: "search",
      label: "Filter by name",
    },
    value: "",
  });

  const inputReference = useRef();

  useEffect(() => {
    const getFilteredData = async () => {
      const query =
        inputSearch.value.length === 0
          ? ""
          : `?orderBy="name"&equalTo="${inputSearch.value}"`;
      try {
        const response = await fetch(
          "https://purchase-list-688c1.firebaseio.com/purchases.json" + query
        );
        const responseData = await response.json();
        let formattedData = [];
        for (let key in responseData) {
          formattedData.push({ id: key, ...responseData[key] });
        }
        filtered(formattedData.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    const time = setTimeout(() => {
      if (inputSearch.value === inputReference.current.value) getFilteredData();
    }, 500);

    return () => {
      clearTimeout(time);
    };
  }, [inputSearch, filtered]);

  return (
    <Input
      elementconfig={inputSearch.elementConfig}
      inputtype="input"
      value={inputSearch.value}
      reference={inputReference}
      changed={(event) =>
        setInputSearch({ ...inputSearch, value: event.target.value })
      }
    />
  );
});
export default SearchPurchase;
