import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { breadcrumbConfig } from '../config/breadcrumbConfig';

const BreadcrumbNav = ({ className = '', projectName }) => {
  const location = useLocation();
  const params = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateBreadcrumb = async () => {
      setLoading(true);
      
      const matchedConfig = findMatchingConfig(location.pathname);
      
      if (!matchedConfig) {
        setBreadcrumbItems([]);
        setLoading(false);
        return;
      }

      const processedItems = matchedConfig.map((item) => {
        let processedItem = { ...item };
        
        // path가 있고 파라미터를 포함하는 경우 실제 경로로 변환
        if (item.path) {
          processedItem.path = replaceParamsInPath(item.path, params);
        }
        
        // :projectName을 실제 프로젝트 이름으로 변환
        if (item.label === ':projectName') {
          processedItem.label = projectName || `프로젝트 ${params.id}`;
        }
        
        return processedItem;
      });

      setBreadcrumbItems(processedItems);
      setLoading(false);
    };

    generateBreadcrumb();
  }, [location.pathname, params, projectName]);

  const findMatchingConfig = (pathname) => {
    if (breadcrumbConfig[pathname]) {
      return breadcrumbConfig[pathname];
    }

    for (const configPath in breadcrumbConfig) {
      if (configPath.includes(':')) {
        const regex = new RegExp(
          '^' + configPath.replace(/:[^\s/]+/g, '[^/]+') + '$'
        );
        if (regex.test(pathname)) {
          return breadcrumbConfig[configPath];
        }
      }
    }

    return null;
  };

  const replaceParamsInPath = (path, params) => {
    let newPath = path;
    Object.keys(params).forEach(key => {
      newPath = newPath.replace(`:${key}`, params[key]);
    });
    return newPath;
  };

  if (loading) {
    return <div className="h-6 bg-gray-200 rounded animate-pulse"></div>;
  }

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav className={`flex items-center w-full space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center text-gray-500 transition-colors hover:text-gray-700"
      >
        <HomeIcon className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          {item.path && !item.isActive ? (
            <Link
              to={item.path}
              className="text-gray-500 transition-colors hover:text-gray-700"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;