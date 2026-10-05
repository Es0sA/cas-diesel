import fs from 'fs';
const file = '../cas-diesel-minimal/src/components/OrderDetail.jsx';
let content = fs.readFileSync(file, 'utf8');

const disputeFn = `
  const handleDispute = async () => {
    const reason = window.prompt("Enter reason for dispute (Quality, Shortage, Delay):");
    if (!reason) return;
    try {
      setLoading(true);
      await api.orders.dispute(orderId, { reason });
      await fetchData();
    } catch (err) {
      alert('Failed to file dispute: ' + err.message);
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {`;

content = content.replace("const handleSendMessage = async (e) => {", disputeFn);

const disputeBtn = `
        <div className="text-left md:text-right flex flex-col items-start md:items-end">
          <p className="text-sm text-cas-muted">Total Escrow Amount</p>
          <p className="text-3xl font-extrabold text-cas-slate">₦{(order.totalAmount || 0).toLocaleString()}</p>
          {['FUNDED', 'IN_TRANSIT', 'ARRIVED'].includes(order.status) && (
            <button 
              onClick={handleDispute}
              className="mt-3 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              File Dispute
            </button>
          )}
        </div>
      </div>`;

content = content.replace(/<div className="text-right">\s*<p className="text-sm text-cas-muted">Total Escrow Amount<\/p>\s*<p className="text-3xl font-extrabold text-cas-slate">₦{\(order\.totalAmount \|\| 0\)\.toLocaleString\(\)}<\/p>\s*<\/div>\s*<\/div>/, disputeBtn);

fs.writeFileSync(file, content);
