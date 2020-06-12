import React from "react";
import classes from "./PurchaseList.module.css";
import PurchaseItem from "./PurchaseItem";
import PurchaseItemEdit from "../../containers/PurchaseItemEdit";
import LoadingSpinner from "../../UI/LoadingSpinner";

const PurchaseList = ({
  purchases,
  cancelPurchase,
  removePurchase,
  editPurchase,
  savePurchase,
  isLoadingRemove,
  isLoadingEdit,
}) => {
  const list = (
    <ol className={classes.PurchaseList}>
      {purchases.map((purchase) => {
        if (purchase.isEdit)
          return (
            <PurchaseItemEdit
              key={purchase.id}
              id={purchase.id}
              name={purchase.name}
              amount={purchase.amount}
              unit={purchase.unit}
              saved={savePurchase}
              cancel={() => cancelPurchase(purchase.id)}
            />
          );
        return (
          <PurchaseItem
            key={purchase.id}
            name={purchase.name}
            amount={purchase.amount}
            unit={purchase.unit}
            removed={() => removePurchase(purchase.id)}
            edited={() => editPurchase(purchase.id)}
          />
        );
      })}
    </ol>
  );

  return (
    <React.Fragment>
      {purchases.length > 0 ? (
        <React.Fragment>
          <h2>You need to buy:</h2>
          {isLoadingEdit && <LoadingSpinner />}
          {list}
          {isLoadingRemove && <LoadingSpinner />}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};
export default PurchaseList;
