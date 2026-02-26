import CartItems from "@/features/cart/components/CartItems";
import { BsHandbag } from "react-icons/bs";

export default function CartPage() {
  return (
    <section className="w-full flex flex-col items-center gap-8">
      <div className="w-[90%] flex items-center mx-auto">
        <span className="flex items-center gap-2">
          <BsHandbag className="text-lg" /> <h1>سبد سفارشات</h1>
        </span>
      </div>
      <CartItems />
    </section>
  );
}
