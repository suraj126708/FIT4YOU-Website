export default function PricingProperties({ feature }) {
  return (
    <>
      <li className="flex justify-left items-center gap-2 ml-2">
        <i class="fa-brands fa-slack"></i>
        <p>{feature}</p>
      </li>
    </>
  );
}
