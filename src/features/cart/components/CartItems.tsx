import CartItem from "./CartItem";

export default function CartItems() {
  return (
    <div className="w-[90%] mx-auto grid grid-cols-1 gap-y-4">
      {[0, 1, 2, 3].map((item, index) => (
        <CartItem key={index} />
      ))}
    </div>
  );
}
