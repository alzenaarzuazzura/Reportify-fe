import { Input } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { formatPhoneInput, parsePhoneForBackend } from '@reportify/utils/phoneFormatter';

type PhoneInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: 'large' | 'middle' | 'small';
  disabled?: boolean;
  status?: '' | 'error' | 'warning';
};

/**
 * PhoneInput Component
 * Automatically formats phone number as user types: (+62) 812-3456-7890
 * Sends clean format to backend: 6281234567890
 */
const PhoneInput = ({ 
  value, 
  onChange, 
  placeholder = 'Contoh: 081234567890',
  size = 'large',
  disabled = false,
  status
}: PhoneInputProps) => {
  const [displayValue, setDisplayValue] = useState('');

  // Initialize display value from prop
  useEffect(() => {
    if (value) {
      setDisplayValue(formatPhoneInput(value));
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Format for display
    const formatted = formatPhoneInput(inputValue);
    setDisplayValue(formatted);
    
    // Parse for backend (remove formatting)
    const cleaned = parsePhoneForBackend(inputValue);
    
    // Call onChange with cleaned value
    if (onChange) {
      onChange(cleaned);
    }
  };

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      prefix={<PhoneOutlined />}
      size={size}
      disabled={disabled}
      status={status}
      maxLength={20} // (+62) 812-3456-7890 = 20 chars
    />
  );
};

export default PhoneInput;
