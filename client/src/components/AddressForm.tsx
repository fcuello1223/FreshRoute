import { X } from "lucide-react";
import {
  Fragment,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";

type AddressFormData = {
  label: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
};

interface AddressFormProps {
  form: AddressFormData;
  setForm: Dispatch<SetStateAction<AddressFormData>>;
  resetForm: () => void;
  editingID: string | null;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

const AddressForm = ({
  form,
  setForm,
  resetForm,
  editingID,
  handleSubmit,
}: AddressFormProps) => {
  return (
    <Fragment>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-50" />
      {/* Form Container */}
      <div onClick={resetForm} className="fixed inset-0 z-50 flex-center p-4">
        <form
          onClick={(event) => event.stopPropagation()}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 w-full max-w-lg animate-fade-in"
        >
          {/* Form Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-app-green">
              {editingID ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 hover:bg-app-cream rounded-lg"
            >
              <X className="size-5" />
            </button>
          </div>
          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-app-green mb-1.5">
                Label
              </label>
              <input
                type="text"
                placeholder="Home, Work, etc."
                required
                value={form.label}
                onChange={(event) =>
                  setForm({ ...form, label: event.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-app-green mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(event) =>
                  setForm({ ...form, address: event.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-app-green mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(event) =>
                    setForm({ ...form, city: event.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-app-green mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(event) =>
                    setForm({ ...form, state: event.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-app-green mb-1.5">
                  Zip Code
                </label>
                <input
                  type="text"
                  required
                  value={form.zip}
                  onChange={(event) =>
                    setForm({ ...form, zip: event.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(event) =>
                      setForm({ ...form, isDefault: event.target.checked })
                    }
                  />
                  <span className="text-sm text-app-text">Set as Default</span>
                </label>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-app-green text-white font-semibold rounded-xl hover:bg-app-green-light transition-colors"
          >
            {editingID ? "Update Address" : "Save Address"}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default AddressForm;
