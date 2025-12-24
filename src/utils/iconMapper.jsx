import * as Icons from 'lucide-react';

export const getIconComponent = (iconName, size = 24) => {
  const IconComponent = Icons[iconName];
  if (!IconComponent) {
    console.warn(`Ícone "${iconName}" não encontrado`);
    return Icons.QuestionCircle || (() => <span>?</span>);
  }
  return <IconComponent size={size} />;
};