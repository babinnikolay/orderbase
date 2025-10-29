import React from "react";

const EMPTY_CLIENT_ID = "--";

function SelectClient({ clients, defaultId, setClientId }) {
  const changed = clients.slice();
  changed.unshift({ id: null, name: EMPTY_CLIENT_ID });

  function handleSelectClientChange(e) {
    setClientId(e.target.value);
  }

  return (
    <div className="flex flex-col w-64">
      <label htmlFor="client-id" className="py-2 w-full">
        Client
      </label>
      <select
        name="client-id"
        id="client-id"
        className="p-2 bg-primary-300 text-primary-800 rounded-xl w-full h-[42px]"
        defaultValue={defaultId}
        onChange={(e) => handleSelectClientChange(e)}
      >
        {changed.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectClient;
