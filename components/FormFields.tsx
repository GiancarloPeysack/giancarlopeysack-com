"use client";

import { ReactNode } from "react";

export function FieldLabel({
  children,
  required,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block font-bold text-[17px] sm:text-[18px] text-black mb-3">
      {children}
      {required && (
        <span
          aria-hidden
          className="inline-flex items-center justify-center align-middle ml-2 text-[11px] text-gray-500"
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "#F3F4F6",
          }}
        >
          *
        </span>
      )}
    </label>
  );
}

export function TextInput({
  name,
  placeholder,
  type = "text",
  required,
  value,
  onChange,
}: {
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 text-[16px] text-black bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
    />
  );
}

export function Select({
  name,
  required,
  value,
  onChange,
  options,
  placeholder,
}: {
  name: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none px-4 py-3 pr-10 text-[16px] text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
      >
        <option value="" disabled>
          {placeholder ?? ""}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
      >
        ▾
      </span>
    </div>
  );
}

export function RadioCards({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  return (
    <div className="space-y-2.5">
      {options.map((opt, i) => {
        const selected = value === opt;
        return (
          <label
            key={opt}
            className={`flex items-center gap-3 px-4 py-3 border rounded-md cursor-pointer transition select-none ${
              selected
                ? "border-black bg-gray-50"
                : "border-gray-300 hover:border-gray-400 bg-white"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={selected}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            <span
              aria-hidden
              className={`inline-flex items-center justify-center text-[12px] font-semibold rounded-md ${
                selected
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              style={{ width: 24, height: 24 }}
            >
              {letters[i] ?? "?"}
            </span>
            <span className="text-[16px] text-black">{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

export function SubmitButton({
  label,
  loading,
}: {
  label: string;
  loading?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold text-[16px] rounded-md hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Sending…" : label}
      {!loading && <span aria-hidden>→</span>}
    </button>
  );
}
