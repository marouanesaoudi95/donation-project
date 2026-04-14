import React, { useState } from 'react';
// 1. Sigura l-import rahou s-hih
import { DONATION_TYPES } from '../../utils/constants';

const PostForm = ({ onSubmit, loading, submitLabel }) => {
    const [formData, setFormData] = useState({
        donationType: '', // Hna ra7 t-stoki ghir l-'value' (e.g. 'food')
        quantity: 1,
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Donation Type *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {/* 2. Hna l-ghalta: DONATION_TYPES rahou dork Array of Objects */}
                    {DONATION_TYPES.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            // 3. Selectionni b type.value (machi type wa7dou)
                            onClick={() => setFormData({ ...formData, donationType: type.value })}
                            className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${formData.donationType === type.value
                                    ? 'bg-[#f97316] text-white border-[#f97316] shadow-lg scale-105'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#f97316]'
                                }`}
                        >
                            {/* 4. Affichi l-emoji w l-label bach ma-ybqash l-button fargh */}
                            <span className="text-2xl">{type.emoji}</span>
                            <span className="text-xs font-bold uppercase tracking-wider">
                                {type.value}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Rest of the form (Quantity, Description...) */}
            <button
                type="submit"
                disabled={loading || !formData.donationType}
                className="w-full py-4 bg-[#f97316] text-white rounded-xl font-bold"
            >
                {loading ? 'Processing...' : submitLabel}
            </button>
        </form>
    );
};

export default PostForm;