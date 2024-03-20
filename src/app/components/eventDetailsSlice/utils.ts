// utils.ts
export interface EventProperty {
  name: string;
  type: string;
  defaultValue?: string;
}

export const parseProperties = (text: string): EventProperty[] => {
  if (!text) {
    return [];
  }

  return text.split('\n').map((line) => {
    const parts = line.split(':');
    if (parts.length < 2) {
      return { name: '', type: '', defaultValue: undefined };
    }

    const [name, typeWithDefaultValue] = parts;
    const [type, defaultValueWithEqual] = typeWithDefaultValue.split('=');
    const defaultValue = defaultValueWithEqual ? defaultValueWithEqual.slice(1) : undefined;

    return { name, type, defaultValue };
  });
};