import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Dropdown } from './ui/Dropdown';
import { useLanguage } from '../contexts/LanguageContext';

interface WorkshopSection {
  id: string;
  folderName: string;
  en: string;
  vi: string;
  children?: WorkshopSection[];
}

interface WorkshopNavigationProps {
  sections: WorkshopSection[];
}

export function WorkshopNavigation({ sections }: WorkshopNavigationProps) {
  const { language } = useLanguage();
  const location = useLocation();

  const isActive = (sectionId: string) => {
    return location.pathname.includes(sectionId);
  };

  const renderSubItem = (child: WorkshopSection, parentSection: WorkshopSection) => {
    const childPath = `/workshop/${parentSection.id}/${child.id}`;
    const isChildActive = isActive(child.id);

    return (
      <Link
        key={child.id}
        to={childPath}
        className={`block px-4 py-2 text-sm transition-colors ${
          isChildActive
            ? 'bg-accent-orange/10 text-accent-orange font-medium'
            : 'text-gray-700 hover:bg-gray-50 hover:text-accent-orange'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          {language === 'en' ? child.en : child.vi}
        </div>
      </Link>
    );
  };

  const renderSection = (section: WorkshopSection) => {
    const sectionPath = `/workshop/${section.id}`;
    const isSectionActive = isActive(section.id);
    const hasChildren = section.children && section.children.length > 0;

    if (hasChildren) {
      return (
        <div key={section.id} className="mb-2">
          <Dropdown
            trigger={
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">
                  {language === 'en' ? section.en : section.vi}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {section.children?.length}
                </span>
              </div>
            }
            className="w-full"
          >
            {section.children?.map(child => renderSubItem(child, section))}
          </Dropdown>
        </div>
      );
    }

    return (
      <Link
        key={section.id}
        to={sectionPath}
        className={`block w-full text-left px-4 py-3 rounded-lg border transition-all ${
          isSectionActive
            ? 'bg-accent-orange/10 border-accent-orange/30 text-accent-orange font-medium'
            : 'bg-white border-gray-200 text-gray-700 hover:border-accent-orange/30 hover:text-accent-orange hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span>{language === 'en' ? section.en : section.vi}</span>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </Link>
    );
  };

  return (
    <nav className="space-y-2">
      {sections.map(renderSection)}
    </nav>
  );
}
