export const validatePhone = (phone: string): string | null => {
  if (phone === "") return "";

  if (isNaN(Number(phone))) return null;

  if (phone.length === 1) {
    if (phone === "0") return phone;
    if (phone === "9") return "0" + phone;
  }

  if (!/^09\d{0,9}$/.test(phone)) return null;

  return phone;
};

export const validateNationalCode = (value: string): string | null => {
  if (value === "") return "";

  if (isNaN(Number(value))) return null;

  if (value.length > 10) return null;

  return value;
};
