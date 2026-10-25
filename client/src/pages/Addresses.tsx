import { MapPin, Plus } from "lucide-react";
import { useEffect, useState, type SubmitEvent } from "react";

import { dummyAddressData } from "../assets/assets";

import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";
import Loading from "../components/Loading";

import type { Address } from "../types";

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingID, setEditingID] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });

  const resetForm = () => {
    setForm({
      label: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    });
    setShowForm(false);
    setEditingID(null);
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
  };

  const onEditHandler = (inputAddress: Address) => {
    setForm({
      label: inputAddress.label,
      address: inputAddress.address,
      city: inputAddress.city,
      state: inputAddress.state,
      zip: inputAddress.zip,
      isDefault: inputAddress.isDefault,
    });
    setEditingID(inputAddress._id);
    setShowForm(true);
  };

  useEffect(() => {
    setAddresses(dummyAddressData);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-app-green">
            My Addresses
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-4 py-2 bg-app-green text-white text-sm font-semibold rounded-xl hover:bg-app-green-light transition-colors flex items-center gap-2"
          >
            <Plus className="size-4" /> Add Address
          </button>
        </div>
        {/* Form Modal */}
        {showForm && (
          <AddressForm
            form={form}
            setForm={setForm}
            editingID={editingID}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
          />
        )}
        {/* Addresses List */}
        {isLoading ? (
          <Loading />
        ) : addresses.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="size-16 text-app-border mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-app-green mb-2">
              No addresses saved
            </h2>
            <p className="text-sm text-app-text-light">
              Add an address for faster checkout
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => {
              return (
                <AddressCard
                  key={address._id}
                  address={address}
                  onEditHandler={onEditHandler}
                  setAddresses={setAddresses}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;
