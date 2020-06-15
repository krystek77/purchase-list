import React, { useState, useEffect, useRef, useContext } from "react";
// import classes from "./SearchPurchase.module.css";

import Input from "../../UI/Input";
import { AuthContext } from "../../context/auth";

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
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const getFilteredData = async () => {
      const query = `?orderBy="userId"&equalTo="${authContext.userId}"`;
      try {
        const response = await fetch(
          `https://purchase-list-688c1.firebaseio.com/purchases.json` + query
        );
        const responseData = await response.json();
        let formattedData = [];
        for (let key in responseData) {
          formattedData.push({ id: key, ...responseData[key] });
        }
        if (inputSearch.value.length !== 0) {
          formattedData = formattedData.filter(
            (purchase) => purchase.name === inputSearch.value
          );
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
