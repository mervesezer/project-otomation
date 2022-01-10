import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import AuthUser from "../../models/AuthUser";
import Input from "./Input";

interface SelectEmployeeDropdownProps {
  data: AuthUser[];
  onSelect: (id: string) => void;
}

export default function SelectEmployeeDropdown({
  data,
  onSelect,
}: SelectEmployeeDropdownProps) {
  const [isDataShown, setIsDataShown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div className="flex gap-3 justify-center">
        <Input
          placeholder="Çalışan Seç"
          value={inputValue}
          onChange={(e) => {
            setIsDataShown(true);
            setInputValue(e.target.value);
          }}
        />

        <button
          className="rounded-md border-gray-300 border px-2"
          type="button"
          onClick={() => setIsDataShown(!isDataShown)}
        >
          {isDataShown ? (
            <FiChevronUp className="text-gray-400" />
          ) : (
            <FiChevronDown className="text-gray-400" />
          )}
        </button>
      </div>

      {isDataShown ? (
        <div className="absolute flex flex-col gap-5 inset-x-0 px-6 py-3 mx-5 mt-4 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-52 z-50">
          {data
            .filter(({ name, lastName }) =>
              `${name} ${lastName}`
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            )
            .map(({ id, name, lastName, email }) => (
              <button
                className="py-1 flex gap-3 hover:bg-gray-100 w-full rounded-md px-2 items-center"
                key={id}
                type="button"
                onClick={() => {
                  setInputValue(`${name} ${lastName}`);
                  setIsDataShown(false);
                  onSelect(id);
                }}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${name}+${lastName}&rounded=true&size=32&background=random`}
                  alt=""
                />
                <h3 className="font-medium text-gray-700">
                  {`${name} ${lastName}`}
                </h3>
                <span className="text-xs text-gray-500">{email}</span>
              </button>
            ))}
          {data.length < 1 ? <h1>Çalışan Yok</h1> : null}
        </div>
      ) : null}
    </div>
  );
}
