// Website Editor Tool
class WebsiteEditor {
    constructor() {
        this.isEditing = false;
        this.originalContent = {};
        this.editableElements = [];
        this.init();
    }

    init() {
        this.createEditorUI();
        this.setupEventListeners();
        this.loadEditableElements();
    }

    createEditorUI() {
        const editorHTML = `
            <div id="websiteEditor" class="editor-panel" style="display: none;">
                <div class="editor-header">
                    <h3>🌐 Website Editor</h3>
                    <div class="editor-controls">
                        <button id="saveChanges" class="btn btn-primary">💾 Save Changes</button>
                        <button id="cancelEdit" class="btn btn-secondary">❌ Cancel</button>
                        <button id="toggleEditor" class="btn btn-success">✏️ Toggle Editor</button>
                    </div>
                </div>
                <div class="editor-content">
                    <div class="editor-section">
                        <h4>📝 Editable Content</h4>
                        <div id="editableList" class="editable-list"></div>
                    </div>
                    <div class="editor-section">
                        <h4>⚙️ Quick Settings</h4>
                        <div class="quick-settings">
                            <div class="setting-group">
                                <label>Business Name:</label>
                                <input type="text" id="businessName" class="setting-input">
                            </div>
                            <div class="setting-group">
                                <label>Tagline:</label>
                                <input type="text" id="businessTagline" class="setting-input">
                            </div>
                            <div class="setting-group">
                                <label>Email:</label>
                                <input type="email" id="businessEmail" class="setting-input">
                            </div>
                            <div class="setting-group">
                                <label>Phone:</label>
                                <input type="tel" id="businessPhone" class="setting-input">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button id="editorToggle" class="editor-toggle-btn">✏️</button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', editorHTML);
    }

    setupEventListeners() {
        // Toggle editor panel
        document.getElementById('editorToggle').addEventListener('click', () => {
            this.toggleEditor();
        });

        // Save changes
        document.getElementById('saveChanges').addEventListener('click', () => {
            this.saveChanges();
        });

        // Cancel editing
        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.cancelEdit();
        });

        // Toggle edit mode
        document.getElementById('toggleEditor').addEventListener('click', () => {
            this.toggleEditMode();
        });

        // Quick settings changes
        const quickSettings = ['businessName', 'businessTagline', 'businessEmail', 'businessPhone'];
        quickSettings.forEach(setting => {
            const input = document.getElementById(setting);
            if (input) {
                input.addEventListener('change', (e) => {
                    this.updateQuickSetting(setting, e.target.value);
                });
            }
        });
    }

    loadEditableElements() {
        // Define editable elements with their selectors and labels
        this.editableElements = [
            { selector: '.hero h1', label: 'Main Heading', type: 'text' },
            { selector: '.hero p', label: 'Hero Description', type: 'text' },
            { selector: '.about-content h2', label: 'About Heading', type: 'text' },
            { selector: '.about-content p', label: 'About Description', type: 'textarea' },
            { selector: '.services h2', label: 'Services Heading', type: 'text' },
            { selector: '.contact h2', label: 'Contact Heading', type: 'text' },
            { selector: '.contact-info .address', label: 'Address', type: 'text' },
            { selector: '.contact-info .phone', label: 'Phone', type: 'text' },
            { selector: '.contact-info .email', label: 'Email', type: 'email' },
            { selector: '.contact-info .hours', label: 'Business Hours', type: 'text' },
            { selector: 'footer p', label: 'Footer Text', type: 'text' }
        ];

        this.populateEditableList();
    }

    populateEditableList() {
        const editableList = document.getElementById('editableList');
        editableList.innerHTML = '';

        this.editableElements.forEach((element, index) => {
            const domElement = document.querySelector(element.selector);
            if (domElement) {
                const item = document.createElement('div');
                item.className = 'editable-item';
                item.innerHTML = `
                    <div class="editable-header">
                        <span class="editable-label">${element.label}</span>
                        <button class="edit-btn" data-index="${index}">✏️ Edit</button>
                    </div>
                    <div class="editable-content" data-selector="${element.selector}">
                        ${domElement.innerHTML}
                    </div>
                `;
                editableList.appendChild(item);

                // Add edit button event listener
                item.querySelector('.edit-btn').addEventListener('click', () => {
                    this.editElement(index);
                });
            }
        });
    }

    editElement(index) {
        const element = this.editableElements[index];
        const domElement = document.querySelector(element.selector);
        
        if (!domElement) return;

        // Store original content
        this.originalContent[element.selector] = domElement.innerHTML;

        // Create edit interface
        const editContainer = document.createElement('div');
        editContainer.className = 'edit-container';
        
        if (element.type === 'textarea') {
            editContainer.innerHTML = `
                <textarea class="edit-input" rows="4">${domElement.textContent}</textarea>
                <div class="edit-actions">
                    <button class="save-edit-btn">💾 Save</button>
                    <button class="cancel-edit-btn">❌ Cancel</button>
                </div>
            `;
        } else {
            editContainer.innerHTML = `
                <input type="${element.type}" class="edit-input" value="${domElement.textContent}">
                <div class="edit-actions">
                    <button class="save-edit-btn">💾 Save</button>
                    <button class="cancel-edit-btn">❌ Cancel</button>
                </div>
            `;
        }

        // Replace content with edit interface
        domElement.innerHTML = '';
        domElement.appendChild(editContainer);

        // Focus on input
        const input = editContainer.querySelector('.edit-input');
        input.focus();
        input.select();

        // Add event listeners
        editContainer.querySelector('.save-edit-btn').addEventListener('click', () => {
            this.saveElementEdit(element.selector, input.value);
        });

        editContainer.querySelector('.cancel-edit-btn').addEventListener('click', () => {
            this.cancelElementEdit(element.selector);
        });

        // Enter key to save, Escape to cancel
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.saveElementEdit(element.selector, input.value);
            } else if (e.key === 'Escape') {
                this.cancelElementEdit(element.selector);
            }
        });
    }

    saveElementEdit(selector, newValue) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = newValue;
            this.showNotification('Content updated successfully!', 'success');
            this.populateEditableList(); // Refresh the list
        }
    }

    cancelElementEdit(selector) {
        const element = document.querySelector(selector);
        if (element && this.originalContent[selector]) {
            element.innerHTML = this.originalContent[selector];
        }
    }

    toggleEditor() {
        const editor = document.getElementById('websiteEditor');
        const isVisible = editor.style.display !== 'none';
        editor.style.display = isVisible ? 'none' : 'block';
    }

    toggleEditMode() {
        this.isEditing = !this.isEditing;
        document.body.classList.toggle('editing-mode', this.isEditing);
        
        const toggleBtn = document.getElementById('toggleEditor');
        toggleBtn.textContent = this.isEditing ? '👁️ View Mode' : '✏️ Edit Mode';
        
        if (this.isEditing) {
            this.showNotification('Edit mode enabled. Click on any text to edit!', 'info');
        } else {
            this.showNotification('View mode enabled.', 'info');
        }
    }

    updateQuickSetting(setting, value) {
        // Update corresponding elements based on setting
        switch(setting) {
            case 'businessName':
                document.querySelectorAll('.business-name').forEach(el => {
                    el.textContent = value;
                });
                break;
            case 'businessTagline':
                document.querySelectorAll('.business-tagline').forEach(el => {
                    el.textContent = value;
                });
                break;
            case 'businessEmail':
                document.querySelectorAll('.business-email').forEach(el => {
                    el.textContent = value;
                });
                break;
            case 'businessPhone':
                document.querySelectorAll('.business-phone').forEach(el => {
                    el.textContent = value;
                });
                break;
        }
    }

    saveChanges() {
        // Collect all current content
        const contentData = {};
        this.editableElements.forEach(element => {
            const domElement = document.querySelector(element.selector);
            if (domElement) {
                contentData[element.selector] = domElement.innerHTML;
            }
        });

        // Save to localStorage (in a real app, this would save to a server)
        localStorage.setItem('websiteContent', JSON.stringify(contentData));
        
        // Update config.js content
        this.updateConfigFile(contentData);
        
        this.showNotification('Changes saved successfully!', 'success');
    }

    updateConfigFile(contentData) {
        // This would typically update a server-side config file
        // For now, we'll just log the changes
        console.log('Content changes to be saved:', contentData);
        
        // In a real implementation, you would:
        // 1. Send the data to your server
        // 2. Update the config.js file
        // 3. Reload the page or update the config
    }

    cancelEdit() {
        // Restore original content
        Object.keys(this.originalContent).forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = this.originalContent[selector];
            }
        });
        
        this.isEditing = false;
        document.body.classList.remove('editing-mode');
        this.showNotification('Changes cancelled.', 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if user is logged in or in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.websiteEditor = new WebsiteEditor();
    }
}); 