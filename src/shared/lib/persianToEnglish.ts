export const convertToEnglishDigits = (value: string): string => {
  if (!value) return value;

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  return value
    .split("")
    .map((char) => {
      const persianIndex = persianDigits.indexOf(char);
      if (persianIndex > -1) return persianIndex.toString();

      const arabicIndex = arabicDigits.indexOf(char);
      if (arabicIndex > -1) return arabicIndex.toString();

      return char;
    })
    .join("");
};
