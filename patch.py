import re

def patch_file():
    with open('src/components/RegisterPage.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove INITIAL_INVITES import
    content = re.sub(r"import\s*\{\s*INITIAL_INVITES\s*\}\s*from\s*'../data/invites';\n", "", content)

    # 2. Add email, password, confirmPassword states
    driver_states = """  const [driverEmail, setDriverEmail] = useState('');
  const [driverPassword, setDriverPassword] = useState('');
  const [driverConfirmPassword, setDriverConfirmPassword] = useState('');
  const [driverName, setDriverName] = useState('');"""
    content = re.sub(
        r"  const \[driverInviteCode,.*?const \[driverName, setDriverName\] = useState\(''\);",
        driver_states,
        content,
        flags=re.DOTALL
    )
    # Remove invites state
    content = re.sub(r"  // Global Invite Codes state.*?INITIAL_INVITES;\n  }\);\n", "", content, flags=re.DOTALL)

    buyer_states = """  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPassword, setBuyerPassword] = useState('');
  const [buyerConfirmPassword, setBuyerConfirmPassword] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');"""
    content = re.sub(r"  const \[buyerCompany, setBuyerCompany\] = useState\(''\);", buyer_states, content)

    supplier_states = """  const [supplierEmail, setSupplierEmail] = useState('');
  const [supplierPassword, setSupplierPassword] = useState('');
  const [supplierConfirmPassword, setSupplierConfirmPassword] = useState('');
  const [supplierName, setSupplierName] = useState('');"""
    content = re.sub(r"  const \[supplierName, setSupplierName\] = useState\(''\);", supplier_states, content)

    # Remove useEffects and validateCode
    content = re.sub(r"  // Check code on load.*?setGeolocating\(false\);\n    }\n  };\n", "  const [authError, setAuthError] = useState('');\n", content, flags=re.DOTALL)
    content = re.sub(r"  const handleTriggerGeolocation.*?setGeolocating\(false\);\n    }\n  };\n", "", content, flags=re.DOTALL)

    # Re-add geolocation trigger, missed it above
    geo_trigger = """  const handleTriggerGeolocation = () => {
    setGeolocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(6));
          setLongitude(pos.coords.longitude.toFixed(6));
          setGeolocating(false);
        },
        () => {
          setLatitude('6.595180');
          setLongitude('3.342110');
          setGeolocating(false);
        },
        { timeout: 8000 }
      );
    } else {
      setGeolocating(false);
    }
  };"""
    content = content.replace("  const [authError, setAuthError] = useState('');\n", "  const [authError, setAuthError] = useState('');\n\n" + geo_trigger + "\n")

    # Fix handleDriverSubmit
    new_driver_submit = """  const handleDriverSubmit = async (e) => {
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
    content = re.sub(r"  const handleDriverSubmit = async \(e\) => \{.*?  \};\n", new_driver_submit + "\n", content, flags=re.DOTALL)

    # Fix handleBuyerSubmit
    new_buyer_submit = """  const handleBuyerSubmit = async (e) => {
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
      setAuthError(err.message || 'An error occurred during registration.');
    }
  };"""
    content = re.sub(r"  const handleBuyerSubmit = async \(e\) => \{.*?  \};\n", new_buyer_submit + "\n", content, flags=re.DOTALL)

    # Fix handleSupplierSubmit
    new_supplier_submit = """  const handleSupplierSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (supplierPassword !== supplierConfirmPassword) { setAuthError("Passwords do not match"); return; }
    if (supplierPassword.length < 12) { setAuthError("Password min 12 characters"); return; }
    try {
      const email = supplierEmail.trim().toLowerCase();
      const password = supplierPassword;
      await api.auth.register({ email, password, role: 'SUPPLIER' });
      await api.auth.login({ email, password });
      
      const depotSlug = primaryDepot.toLowerCase().includes('ijegun') ? 'ijegun' :
                        primaryDepot.toLowerCase().includes('apapa') ? 'apapa' :
                        primaryDepot.toLowerCase().includes('warri') ? 'warri' :
                        primaryDepot.toLowerCase().includes('port harcourt') || primaryDepot.toLowerCase().includes('ph') ? 'ph' : 'ijegun';

      await api.companies.updateProfile({
        companyName: supplierName,
        registrationNumber: supplierLicense || supplierRc,
        businessAddress: primaryDepot,
        contactPhone: contactPhone,
        depotId: depotSlug,
        pricePerLitre: initialPrice,
        minOrderVolume: 11000
      });

      setSubmitSuccess({
        role: 'supplier',
        title: 'Marketer Account Created',
        message: `${supplierName} has been registered under NMDPRA license ${supplierLicense}. You can now broadcast spot prices and receive orders.`
      });
    } catch (err) {
      console.error(err);
      setAuthError(err.message || 'An error occurred during registration.');
    }
  };"""
    content = re.sub(r"  const handleSupplierSubmit = async \(e\) => \{.*?  \};\n", new_supplier_submit + "\n", content, flags=re.DOTALL)

    # Now remove Marketer Authorization box from driver form UI
    content = re.sub(r"\{\/\* Marketer Authorization Box \*\/\}[\s\S]*?\{\/\* Driver Personal Information \*\/\}", "{/* Driver Personal Information */}", content)

    # Add Error Banner
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

    # For each form, we need to inject the email, password, confirmPassword inputs.
    # We can use regex to find where the first input is and inject these.
    
    # Driver inputs
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
    
    # Buyer inputs
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
                    
    # Supplier inputs
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
                    
    # Insert driver creds before driverName
    content = re.sub(r'(<label htmlFor="driver-name-in")', driver_creds + r'                    \1', content)
    
    # Insert buyer creds before buyerCompany
    content = re.sub(r'(<label htmlFor="b-company")', buyer_creds + r'                    \1', content)
    
    # Insert supplier creds before supplierName
    content = re.sub(r'(<label htmlFor="s-name")', supplier_creds + r'                    \1', content)

    with open('src/components/RegisterPage.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    patch_file()
