export default function Footer() {
  return (
    <footer className="text-center p-4 bg-black text-white mt-6">
      <p>All rights reserved <span className="text-yellow-300 text-xl">&copy;theObnoxiousTwins</span>  {new Date().getFullYear()}.</p>
    </footer>
  );
}
