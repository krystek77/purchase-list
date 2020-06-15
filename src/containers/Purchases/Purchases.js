import React, { useState, useCallback } from "react";
import classes from "./Purchases.module.css";

import FormList from "../../components/FormList";
import SearchPurchase from "../../components/SearchPurchase";
import PurchaseList from "../../components/PurchaseList";
import ErrorModal from "../../UI/Modal";
import ToolBar from "../../components/ToolBar";

const Purchases = (props) => {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState({
    add: false,
    remove: false,
    edit: false,
  });
  const [error, setError] = useState(null);
  //----- unneeded beacause we do it the same in search component
  // useEffect(() => {
  //   const getPurchases = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://purchase-list-688c1.firebaseio.com/purchases.json"
  //       );
  //       const responseData = await response.json();
  //       const purchases = [];
  //       for (let key in responseData) {
  //         purchases.push({ id: key, ...responseData[key] });
  //       }
  //       setPurchases([...purchases]);
  //     } catch (error) {
  //
  //     }
  //   };
  //   getPurchases();

  //   return () => {};
  // }, []);

  /**
   * Adds some purchase
   * @param {object} purchase
   */
  const addPurchaseHandler = async (purchase) => {
    try {
      setIsLoading({ ...isLoading, add: true });
      const response = await fetch(
        "https://purchase-list-688c1.firebaseio.com/purchases.json",
        {
          method: "POST",
          body: JSON.stringify(purchase),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      setIsLoading({ ...isLoading, add: false });
      setPurchases(
        [...purchases, { id: responseData.name, ...purchase }].reverse()
      );
    } catch (error) {
      setIsLoading({ ...isLoading, add: false });
      setError("Failed to add purchase!");
    }
  };

  /**
   * Removes purchase with given id
   * @param {number} purchaseId
   */
  const removePurchaseHandler = (purchaseId) => {
    const deletePurchaseById = async () => {
      try {
        setIsLoading({ ...isLoading, remove: true });
        const response = await fetch(
          `https://purchase-list-688c1.firebaseio.com/purchases/${purchaseId}.json`,
          { method: "DELETE" }
        );
        // const responseData = await response.json(); - return null if item was deletet

        if (response.status === 200) {
          const updatedPurchases = purchases.filter(
            (purchase) => purchase.id !== purchaseId
          );
          setIsLoading({ ...isLoading, remove: false });
          setPurchases(updatedPurchases);
        }
      } catch (error) {
        setIsLoading({ ...isLoading, remove: false });
        setError("Deleting purchase failed!");
      }
    };
    deletePurchaseById();
  };

  /**
   * Setting purchase as edited
   * @param {number} purchaseId
   */
  const editPurchaseHandler = (purchaseId) => {
    const editPurchase = async () => {
      try {
        setIsLoading({ ...isLoading, edit: true });
        await fetch(
          `https://purchase-list-688c1.firebaseio.com/purchases/${purchaseId}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({ isEdit: true }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const updatedPurchases = [...purchases];
        const index = updatedPurchases.findIndex(
          (purchase) => purchase.id === purchaseId
        );
        const updatedPurchase = { ...updatedPurchases[index] };
        updatedPurchase.isEdit = true;
        updatedPurchases[index] = updatedPurchase;
        setIsLoading({ ...isLoading, edit: false });
        setPurchases([...updatedPurchases]);
      } catch (error) {
        setIsLoading({ ...isLoading, edit: false });
        console.log(error);
      }
    };
    editPurchase();
  };
  /**
   * Cancels editing purchase
   * @param {number} purchaseId
   */
  const cancelPurchaseHandler = (purchaseId) => {
    const cancelEdit = async () => {
      try {
        await fetch(
          `https://purchase-list-688c1.firebaseio.com/purchases/${purchaseId}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({ isEdit: false }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedPurchases = [...purchases];
        const index = updatedPurchases.findIndex(
          (purchase) => purchase.id === purchaseId
        );
        const updatedPurchase = { ...updatedPurchases[index] };
        updatedPurchase.isEdit = false;
        updatedPurchases[index] = updatedPurchase;
        setPurchases([...updatedPurchases]);
      } catch (error) {
        console.log(error);
      }
    };
    cancelEdit();
  };
  /**
   * Saving edited purchase
   *
   *@param {object} purchase
   */
  const savePurchaseHandler = (updatedPurchase) => {
    const saveUpdatedPurchase = async () => {
      try {
        await fetch(
          `https://purchase-list-688c1.firebaseio.com/purchases/${updatedPurchase.id}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({ ...updatedPurchase }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedPurchases = [...purchases];
        const index = updatedPurchases.findIndex(
          (purchase) => purchase.id === updatedPurchase.id
        );
        const updatePurchase = {
          ...updatedPurchases[index],
          ...updatedPurchase,
        };
        updatedPurchases[index] = { ...updatePurchase };

        setPurchases([...updatedPurchases]);
      } catch (error) {
        console.log(error);
      }
    };
    saveUpdatedPurchase();
  };

  const filterPurchasesHandler = useCallback((filteredPurchaseData) => {
    setPurchases(filteredPurchaseData);
  }, []);

  /**
   * Removes modal
   */
  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };
  return (
    <React.Fragment>
      <ToolBar />
      <div className={classes.Purchases}>
        {error && (
          <ErrorModal title={"Error ocurred"} onClose={clearError}>
            {error}
          </ErrorModal>
        )}
        <h1 className={classes.PageTitle}>Purchase List</h1>
        <FormList
          addPurchase={addPurchaseHandler}
          isLoadingAdd={isLoading.add}
        />
        <hr />
        <main>
          <SearchPurchase filtered={filterPurchasesHandler} />
          <PurchaseList
            purchases={purchases}
            removePurchase={removePurchaseHandler}
            editPurchase={editPurchaseHandler}
            cancelPurchase={cancelPurchaseHandler}
            savePurchase={savePurchaseHandler}
            isLoadingRemove={isLoading.remove}
            isLoadingEdit={isLoading.edit}
          />
        </main>
      </div>
    </React.Fragment>
  );
};

export default Purchases;
