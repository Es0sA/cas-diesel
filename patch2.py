import re

def patch_file():
    with open('src/components/RegisterPage.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove INITIAL_INVITES import
    content = content.replace("import { INITIAL_INVITES } from '../data/invites';", "")

    # 2. State replacements
    old_driver = """  const [driverInviteCode, setDriverInviteCode] = useState(inviteCodeParam || '');
  const [verifiedSupplier, setVerifiedSupplier] = useState(null);
  const [codeError, setCodeError] = useState('');
  const [driverName, setDriverName] = useState('');"""
    new_driver = """  const [driverEmail, setDriverEmail] = useState('');
  const [driverPassword, setDriverPassword] = useState('');
  const [driverConfirmPassword, setDriverConfirmPassword] = useState('');
  const [driverName, setDriverName] = useState('');
  const [authError, setAuthError] = useState('');"""
    content = content.replace(old_driver, new_driver)
    
    old_buyer = """  const [buyerCompany, setBuyerCompany] = useState('');"""
    new_buyer = """  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPassword, setBuyerPassword] = useState('');
  const [buyerConfirmPassword, setBuyerConfirmPassword] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');"""
    content = content.replace(old_buyer, new_buyer)
    
    old_supplier = """  const [supplierName, setSupplierName] = useState('');"""
    new_supplier = """  const [supplierEmail, setSupplierEmail] = useState('');
  const [supplierPassword, setSupplierPassword] = useState('');
  const [supplierConfirmPassword, setSupplierConfirmPassword] = useState('');
  const [supplierName, setSupplierName] = useState('');"""
    content = content.replace(old_supplier, new_supplier)
    
    # 3. Remove useEffect & validateCode
    content = re.sub(r"  // Global Invite Codes state.*?INITIAL_INVITES;\n  }\);\n", "", content, flags=re.DOTALL)
    content = re.sub(r"  // Check code on load.*?setVerifiedSupplier\(found\);\n      setCodeError\(''\);\n    }\n  };\n", "", content, flags=re.DOTALL)
    content = re.sub(r"  const handleDriverCodeChange = \(e\) => \{.*?validateCode\(val\);\n  };\n", "", content, flags=re.DOTALL)

    # 4. Fix Submit functions
    driver_sub = """  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (driverPassword !== driverConfirmPassword) { setAuthError("Passwords do not match"); return; }
    if (driverPassword.length < 12) { setAuthError("Password min 12 characters"); return; }
    try {
      const email = driverEmail.trim().toLowerCase();
      const password = driverPassword;
      await api.auth.register({ email, password, role: 'DRIVER' });
      await api.auth.login({ email, password });
      
      const [firstName, ...lastNames] = driverName.split(' ');
      await api.drivers.updateProfile({
        firstName: firstName || 'Unknown',
        lastName: lastNames.join(' ') || 'Driver',
        licenseNumber: driverLicense,
        truckPlateNumber: driverPlate,
        truckCapacityLiters: driverCapacity
      });

      setSubmitSuccess({
        role: 'driver',
        title: 'Driver Registration Approved',
        message: `You are now officially registered as a fleet tanker driver. You will receive order dispatch notifications on WhatsApp at ${driverPhone}.`
      });
    } catch (err) {
      console.error(err);
      setAuthError(err.message || 'An error occurred during registration.');
    }
  };"""
    content = re.sub(r"  const handleDriverSubmit = async \(e\) => \{.*?  \};\n", driver_sub + "\n", content, flags=re.DOTALL)

    buyer_sub = """  const handleBuyerSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (buyerPassword !== buyerConfirmPassword) { setAuthError("Passwords do not match"); return; }
    if (buyerPassword.length < 12) { setAuthError("Password min 12 characters"); return; }
    try {
      const email = buyerEmail.trim().toLowerCase();
      const password = buyerPassword;
      await api.auth.register({ email, password, role: 'BUYER' });
      await api.auth.login({ email, password });
      
      await api.companies.updateProfile({
        companyName: buyerCompany,
        registrationNumber: buyerRcNumber,
        businessAddress: `${latitude}, ${longitude}`,
        contactPhone: receivingOfficerPhone
      });

      setSubmitSuccess({
        role: 'buyer',
        title: 'Corporate Buyer Account Activated',
        message: `${buyerCompany} has been registered with verified discharge gate coordinates at (${latitude}, ${longitude}). You can now deposit into escrow and order directly from loading terminals.`
      });
    } catch (err) {
      console.error(err);
      setAuthError(err.message || 'An error occurred during buyer registration.');
    }
  };"""
    content = re.sub(r"  const handleBuyerSubmit = async \(e\) => \{.*?  \};\n", buyer_sub + "\n", content, flags=re.DOTALL)

    supplier_sub = """  const handleSupplierSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (supplierPassword !== supplierConfirmPassword) { setAuthError("Passwords do not match"); return; }
    if (supplierPassword.length < 12) { setAuthError("Password min 12 characters"); return; }
    try {
      const email = supplierEmail.trim().toLowerCase();
      const password = supplierPassword;
      await api.auth.register({ email, password, role: 'SUPPLIER' });
      await api.auth.login({ email, password });
      
      await api.companies.updateProfile({
        companyName: supplierName,
        registrationNumber: supplierRc,
        businessAddress: primaryDepot,
        contactPhone: contactPhone
      });

      setSubmitSuccess({
        role: 'supplier',
        title: 'Marketer Account Created',
        message: `${supplierName} has been registered under NMDPRA license ${supplierLicense}. You can now broadcast spot prices and receive orders.`
      });
    } catch (err) {
      console.error(err);
      setAuthError(err.message || 'An error occurred during supplier registration.');
    }
  };"""
    content = re.sub(r"  const handleSupplierSubmit = async \(e\) => \{.*?  \};\n", supplier_sub + "\n", content, flags=re.DOTALL)

    # Remove Driver Box UI
    content = re.sub(r"            \{\/\* The Mandatory Supplier Authorization Box \*\/\}[\s\S]*?\{\/\* Driver Personal Information \*\/\}", "{/* Driver Personal Information */}", content)

    # Fix UI inputs
    driver_creds = """                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-cas-slate mb-1.5">Email</label>
                      <input type="email" required value={driverEmail} onChange={(e) => setDriverEmail(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-cas-slate mb-1.5">Password</label>
                      <input type="password" required placeholder="Min. 12 characters" value={driverPassword} onChange={(e) => setDriverPassword(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-cas-slate mb-1.5">Confirm Password</label>
                      <input type="password" required placeholder="Min. 12 characters" value={driverConfirmPassword} onChange={(e) => setDriverConfirmPassword(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>\n"""
    content = content.replace('<label htmlFor="driver-name-in"', driver_creds + '                    <label htmlFor="driver-name-in"')

    buyer_creds = """                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-cas-slate mb-1.5">Email</label>
                      <input type="email" required value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-cas-slate mb-1.5">Password</label>
                      <input type="password" required placeholder="Min. 12 characters" value={buyerPassword} onChange={(e) => setBuyerPassword(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-cas-slate mb-1.5">Confirm Password</label>
                      <input type="password" required placeholder="Min. 12 characters" value={buyerConfirmPassword} onChange={(e) => setBuyerConfirmPassword(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>\n"""
    content = content.replace('<label htmlFor="b-company"', buyer_creds + '                    <label htmlFor="b-company"')

    supplier_creds = """                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-cas-slate mb-1.5">Email</label>
                      <input type="email" required value={supplierEmail} onChange={(e) => setSupplierEmail(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-cas-slate mb-1.5">Password</label>
                      <input type="password" required placeholder="Min. 12 characters" value={supplierPassword} onChange={(e) => setSupplierPassword(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-cas-slate mb-1.5">Confirm Password</label>
                      <input type="password" required placeholder="Min. 12 characters" value={supplierConfirmPassword} onChange={(e) => setSupplierConfirmPassword(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>\n"""
    content = content.replace('<label htmlFor="s-company"', supplier_creds + '                    <label htmlFor="s-company"')

    error_banner = """        {authError && (
          <div className="p-4 mb-8 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-900 shadow-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="font-extrabold text-sm text-rose-950">Authentication Notice</h4>
              <p className="text-xs text-rose-800 mt-0.5 leading-relaxed">{authError}</p>
            </div>
          </div>
        )}"""
    content = content.replace("{/* Success Alert Banner */}", error_banner + "\n\n        {/* Success Alert Banner */}")

    # Remove `disabled={!verifiedSupplier}` on driver form submit button
    content = content.replace("disabled={!verifiedSupplier}", "")

    with open('src/components/RegisterPage.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    patch_file()
