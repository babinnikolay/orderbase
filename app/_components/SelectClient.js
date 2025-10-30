import React from "react";

const EMPTY_CLIENT_NAME = "--";

function SelectClient({ clients, defaultId, disabled, onClientChange }) {
  const changed = clients.slice();
  changed.unshift({ id: "", name: EMPTY_CLIENT_NAME });

  const handleChange = (e) => {
    const clientId = e.target.value;

    onClientChange(clientId);
  };

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
        disabled={disabled}
        onChange={handleChange}
        required
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
