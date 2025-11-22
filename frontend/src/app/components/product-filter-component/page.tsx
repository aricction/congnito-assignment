import { Card } from "@/components/ui/card";
export default function ProductFilterComponent() {
  return (
    <Card className="w-[306px] h-[578px] rounded-md justify-center p-4 flex bg-[#F7F7F8]">
      <div>
        <span className="text-[16px] font-medium">Product Category</span>
      </div>
      <div className="flex items-center space-x-4">
        <input type="checkbox" className="w-4 h-4" />
        <div className="flex justify-between w-full">
          <label className="text-[#7A7A7A]">Juice & Drinks</label>
          <span className="text-[#7A7A7A]">[20]</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <input type="checkbox" className="w-4 h-4" />
        <div className="flex justify-between w-full">
          <label className="text-[#7A7A7A]">Dairy & Milk</label>
          <span className="text-[#7A7A7A]">[54]</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <input type="checkbox" className="w-4 h-4" />
        <div className="flex justify-between w-full">
          <label className="text-[#7A7A7A]">Snack & Spice</label>
          <span className="text-[#7A7A7A]">[64]</span>
        </div>
      </div>

      <div>
        <span className="text-[16px] font-medium">Filter By Price</span>
      </div>
      <input type="range" />
      <p>Price: $20 - $250</p>
      <button className="bg-[#F53E32] text-white py-2 w-[100px] rounded-md font-semibold ">
        Filter
      </button>

      <p className="text-[16px] font-medium">Product Tags</p>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-white border border-[#E9E9E9] text-[#7A7A7A] rounded-md text-[14px] font-medium cursor-pointer">
          Vegetables
        </span>
        <span className="px-3 py-1  bg-white border border-[#E9E9E9] text-[#7A7A7A] rounded-md text-sm font-medium cursor-pointer">
          Juice
        </span>
        <span className="px-3 py-1  bg-white border border-[#E9E9E9] text-[#7A7A7A] rounded-md text-sm font-medium cursor-pointer">
          Food
        </span>
        <span className="px-3 py-1  bg-white border border-[#E9E9E9] text-[#7A7A7A] rounded-md text-sm font-medium cursor-pointer">
          Dry Fruits
        </span>
        <span className="px-3 py-1  bg-white border border-[#E9E9E9] text-[#7A7A7A] rounded-md text-sm font-medium cursor-pointer">
          Vegetables
        </span>
        <span className="px-3 py-1  bg-white border border-[#E9E9E9] text-[#7A7A7A] rounded-md text-sm font-medium cursor-pointer">
          Juice
        </span>
      </div>
    </Card>
  );
}
