import React, { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2, ArrowUp, ArrowDown, HelpCircle, PackageCheck } from 'lucide-react';

export default function FaqEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: '',
      title: 'Commercial Freight & Linehaul Queries',
      subtitle:
        'Everything corporate shippers need to know about booking, transit safety, fleet capacities, and real-time tracking.',
      items: [],
    }
  );

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleFieldChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...(data.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, items: newItems });
  };

  const handleAddItem = () => {
    const newItems = [...(data.items || [])];
    const newId = `faq-${Date.now()}`;
    newItems.push({
      id: newId,
      question: 'New Freight or Transit Question?',
      answer: 'Detailed operational response explaining SRTC’s procedures, safety standards, or SLA adherence.',
      category: 'General Freight',
      badge: 'SRTC SLA',
    });
    setData({ ...data, items: newItems });
  };

  const handleDeleteItem = (index) => {
    const newItems = (data.items || []).filter((_, i) => i !== index);
    setData({ ...data, items: newItems });
  };

  const handleMoveItem = (index, direction) => {
    const newItems = [...(data.items || [])];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setData({ ...data, items: newItems });
  };

  return (
    <div className="card-box animate-fade-in">
      {/* Top Action Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
          marginBottom: '26px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={22} color="var(--gold-primary)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-primary)', margin: 0 }}>
              Container & Truck FAQs (Homepage Section)
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
            Configure headings and manage all freight/shipping questions styled in the industrial container accordion.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={handleAddItem}
            className="btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} />
            <span>Add Question</span>
          </button>
          <button
            type="button"
            onClick={() => onSave('faq', data)}
            disabled={isSaving}
            className="btn-gold"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save FAQs Section</span>
          </button>
        </div>
      </div>

      {/* Section Headings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '18px', marginBottom: '18px' }}>
        <div>
          <label className="input-label">Kicker Badge (e.g. FREQUENTLY ASKED QUESTIONS)</label>
          <input
            type="text"
            value={data.kicker || ''}
            onChange={(e) => handleFieldChange('kicker', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="input-label">Section Title</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div style={{ marginBottom: '28px' }}>
        <label className="input-label">Subtitle Description</label>
        <textarea
          rows={2}
          value={data.subtitle || ''}
          onChange={(e) => handleFieldChange('subtitle', e.target.value)}
          className="input-field"
        />
      </div>

      {/* FAQ Items List */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-primary)', margin: 0 }}>
            Active FAQ Containers ({(data.items || []).length})
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Rendered as interactive shipping container doors with cam-lock handles
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(data.items || []).map((item, idx) => (
            <div
              key={item.id || idx}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '18px 20px',
                boxShadow: '0 2px 8px rgba(11, 47, 74, 0.04)',
                transition: 'all 200ms ease',
              }}
            >
              {/* Item Card Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                  borderBottom: '1px solid #EDF2F7',
                  paddingBottom: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      background: 'rgba(11, 47, 74, 0.08)',
                      color: 'var(--navy-primary)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    [CTR-0{idx + 1}]
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--navy-primary)',
                    }}
                  >
                    Question #{idx + 1}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => handleMoveItem(idx, -1)}
                    disabled={idx === 0}
                    style={{
                      background: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: idx === 0 ? 'not-allowed' : 'pointer',
                      opacity: idx === 0 ? 0.4 : 1,
                    }}
                    title="Move Up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveItem(idx, 1)}
                    disabled={idx === (data.items || []).length - 1}
                    style={{
                      background: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: idx === (data.items || []).length - 1 ? 'not-allowed' : 'pointer',
                      opacity: idx === (data.items || []).length - 1 ? 0.4 : 1,
                    }}
                    title="Move Down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(idx)}
                    style={{
                      background: '#FEE2E2',
                      border: '1px solid #FCA5A5',
                      color: '#B91C1C',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      marginLeft: '6px',
                    }}
                    title="Delete Question"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label className="input-label">Question Text</label>
                  <input
                    type="text"
                    value={item.question || ''}
                    onChange={(e) => handleItemChange(idx, 'question', e.target.value)}
                    className="input-field"
                    placeholder="e.g. What vehicle capacities are available for FTL?"
                  />
                </div>
                <div>
                  <label className="input-label">Category (e.g. Fleet & Capacity)</label>
                  <input
                    type="text"
                    value={item.category || ''}
                    onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                    className="input-field"
                    placeholder="e.g. FTL Transit"
                  />
                </div>
                <div>
                  <label className="input-label">Badge Tag (e.g. 20FT / 40FT)</label>
                  <input
                    type="text"
                    value={item.badge || ''}
                    onChange={(e) => handleItemChange(idx, 'badge', e.target.value)}
                    className="input-field"
                    placeholder="e.g. ZERO LOSS"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Detailed Answer</label>
                <textarea
                  rows={3}
                  value={item.answer || ''}
                  onChange={(e) => handleItemChange(idx, 'answer', e.target.value)}
                  className="input-field"
                  placeholder="Explain the solution, SLA numbers, compliance certifications, or dispatch protocol..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Save Action */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '20px',
          marginTop: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => onSave('faq', data)}
          disabled={isSaving}
          className="btn-gold"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save FAQs Section</span>
        </button>
      </div>
    </div>
  );
}

