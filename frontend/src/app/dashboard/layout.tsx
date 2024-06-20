import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./dashboard.css";
import Link from "next/link";

export default function Dashboard({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="dashboard-page">
      <header className="header-logo">
        <h2 className="logo-text">Market Cashier System</h2>
      </header>

      <div className='control'>
        <Link className='click' href="/dashboard/items">Create Items</Link>
        <Link className='click' href="/dashboard/itemprice">Items Price</Link>
        <Link className='click' href="/dashboard/items">All Items</Link>
        <Link className='click' href="/dashboard/supplier">Create Supplier</Link>
        <Link className='click' href="/dashboard/items">All Supplier</Link>
        <Link className='click' href="/dashboard/items">Invocie Sales</Link>
        <Link className='click' href="/dashboard/items">Invocie Return</Link>
        <Link className='click' href="/dashboard/inventorybuy">Inventory Buy</Link>
        <Link className='click' href="/dashboard/items">Inventory Sell</Link>
        <Link className='click' href="/dashboard/items">Treasury</Link>
        <Link className='click' href="/dashboard/user">Create User</Link>
        <Link className='click' href="/dashboard/user">Reports</Link>
        <Link className='click' href="/dashboard/items">Settings</Link>
      </div>
      {children}
    </section>
  );
}
