import fs from 'fs';
const file = 'src/components/OrderDetail.jsx';
let content = fs.readFileSync(file, 'utf8');

const disputeFn = `
  const handleDispute = async () => {
    const reason = window.prompt("Enter reason for dispute (Quality, Shortage, Delay):");
    if (!reason) return;
    try {
      setLoading(true);
      await api.orders.dispute(order.id, { reason });
      await fetchData();
    } catch (err) {
      alert('Failed to file dispute: ' + err.message);
      setLoading(false);
    }
  };

  const handleSendMessage = async`;

content = content.replace("const handleSendMessage = async", disputeFn);

const disputeBtn = `
          {['FUNDED', 'IN_TRANSIT', 'ARRIVED'].includes(order.status) && (
            <button 
              onClick={handleDispute}
              className="mt-4 sm:mt-0 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              File Dispute
            </button>
          )}
        </div>
`;

content = content.replace("</div>\n      </div>\n\n      {/* Status Timeline */}", disputeBtn + "      </div>\n\n      {/* Status Timeline */}");

fs.writeFileSync(file, content);
