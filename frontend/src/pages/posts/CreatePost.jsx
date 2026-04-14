// 1. Déclari l-types hna d-darba wa7da
const DONATION_TYPES = [
    { value: 'food', label: '🍎 Food', emoji: '🍎' },
    { value: 'clothes', label: '👕 Clothes', emoji: '👕' },
    { value: 'toys', label: '🧸 Toys', emoji: '🧸' },
    { value: 'electronics', label: '📱 Electronics', emoji: '📱' },
    { value: 'books', label: '📚 Books', emoji: '📚' },
    { value: 'other', label: '📦 Other', emoji: '📦' }
];

// 2. Creyi PostForm dakhél nfs l-fichier
const PostForm = ({ onSubmit, loading, submitLabel }) => {
    const [formData, setFormData] = React.useState({
        donationType: '',
        quantity: 1,
        description: ''
    });

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Donation Type *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {DONATION_TYPES.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, donationType: type.value })}
                            className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${formData.donationType === type.value
                                    ? 'bg-[#f97316] text-white border-[#f97316]'
                                    : 'bg-white text-gray-700 border-gray-200'
                                }`}
                        >
                            <span className="text-2xl">{type.emoji}</span>
                            <span className="text-xs font-bold">{type.value.toUpperCase()}</span>
                        </button>
                    ))}
                </div>
            </div>
            {/* ... l-khedma lokhra (Quantity/Description) */}
            <button type="submit" className="w-full p-4 bg-[#f97316] text-white rounded-xl">
                {loading ? 'Processing...' : submitLabel}
            </button>
        </form>
    );
};