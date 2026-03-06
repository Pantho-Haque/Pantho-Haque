import { FormSubmission } from "@/services";
import { useNotification } from "@/hooks";
import { useState } from "react";

export default function FormComponent() {
  const { mutate, isPending: isSubmissionPending } = FormSubmission();
  const { success, error } = useNotification();

  const formDefaultValue = {
    name: "",
    email: "",
    password: "",
    country: "",
    agree: false,
  };
  const [formData, setFormData] = useState(formDefaultValue);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      uid: "1",
      body: formData,
    }, {
      onSuccess: () => {
        success({ title: "Form submitted successfully", desc: "Form submitted successfully", position: "top-right", timeout: 3000 });
      },
      onError: () => {
        error({ title: "Error submitting form", desc: "Error submitting form", position: "top-right", timeout: 3000 });
      },
    });
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
      <div className="max-w-md">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input form-input-valid"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <p className="form-feedback form-feedback-valid">Email is valid</p>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input form-input-invalid"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <p className="form-feedback form-feedback-invalid">
            Password must be at least 8 characters
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            id="country"
            className="form-select"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          >
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
          </select>
        </div>

        <div className="form-group">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="form-checkbox"
              checked={formData.agree}
              onChange={(e) =>
                setFormData({ ...formData, agree: e.target.checked })
              }
            />
            <label htmlFor="terms" className="form-check-label">
              I agree to the terms
            </label>
          </div>
        </div>

        <button className="btn btn-primary w-full" onClick={handleFormSubmit}>
          {isSubmissionPending ? "Submitting..." : "Submit Form"}
        </button>
      </div>
    </section>
  );
}
