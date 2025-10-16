import React from "react";
import SubmitButton from "@/app/_components/SubmitButton";

function formAction(formData) {
  console.log(formData.get("order-client"));
}

function OrderForm() {
  return (
    <>
      <form
        action={formAction}
        className=" bg-primary-900 py-6 px-6 text-lg  gap-5"
      >
        <div className="pb-2">
          <label htmlFor="order-client">Client</label>
          <select
            name="order-client"
            id="order-client"
            className=" px-2 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          >
            <option>Client1</option>
            <option>Client1</option>
            <option>Client1</option>
            <option>Client1</option>
          </select>
        </div>
        <div className="flex flex-row gap-5">
          <div className="space-y-2">
            <label htmlFor="order-date">Date</label>
            <input
              name="order-date"
              type="date"
              id="order-date"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="order-amount">Amount</label>
            <input
              name="order-amount"
              type="number"
              id="order-amount"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="order-description">Description</label>
          <textarea
            name="order-description"
            rows="5"
            id="order-description"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>
        <div className="flex justify-end pt-3 gap-3">
          <SubmitButton>Save</SubmitButton>
          {/*<Button additional="bg-primary-600" onClick={onClose}>*/}
          {/*  Cancel*/}
          {/*</Button>*/}
        </div>
      </form>
    </>
  );
}

export default OrderForm;
