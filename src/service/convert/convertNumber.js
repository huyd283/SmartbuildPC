export function formatNumber(n) {
    if (n == null) return "0.00";
  
    const [integerPart, decimalPart = ""] = n.toString().split(",");
  
  
    const formattedIntegerPart = integerPart
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return `${formattedIntegerPart}`;
  }