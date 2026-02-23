import React from 'react';

const FileManagerPage = () => {
  return (
    <div className="file-manager">
      <header className="file-manager-header">
        <h1>File Manager</h1>
      </header>
      <div className="file-manager-content">
        <aside className="sidebar">
          <nav>
            <ul>
              <li><a href="#">All Files</a></li>
              <li><a href="#">Documents</a></li>
              <li><a href="#">Images</a></li>
              <li><a href="#">Videos</a></li>
            </ul>
          </nav>
        </aside>
        <main className="view-rendering">
          <p>Select a file from the sidebar to view details.</p>
        </main>
      </div>
    </div>
  );
};

export default FileManagerPage;
