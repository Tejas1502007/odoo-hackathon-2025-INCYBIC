// Form functionality for List Item page
document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initFileUpload();
    initDynamicSelects();
    initCharacterCounter();
    initFormSubmission();
});

// Form validation
function initFormValidation() {
    const form = document.getElementById('itemForm');
    const requiredFields = form.querySelectorAll('[required]');
    
    // Add real-time validation
    requiredFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => clearFieldError(field));
    });
    
    // Prevent form submission if invalid
    form.addEventListener('submit', handleFormSubmit);
}

function validateField(field) {
    const fieldGroup = field.closest('.form-group');
    const errorElement = document.getElementById(field.id + '-error');
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error state
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} is required.`;
    }
    
    // Specific field validations
    switch (field.type) {
        case 'email':
            if (field.value && !isValidEmail(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
            break;
            
        case 'file':
            if (field.files.length === 0) {
                isValid = false;
                errorMessage = 'Please upload at least one image.';
            } else if (field.files.length > 5) {
                isValid = false;
                errorMessage = 'Maximum 5 images allowed.';
            } else {
                // Validate file types and sizes
                for (let file of field.files) {
                    if (!isValidImageFile(file)) {
                        isValid = false;
                        errorMessage = 'Please upload only JPG, PNG, or WebP images under 5MB.';
                        break;
                    }
                }
            }
            break;
            
        case 'text':
            if (field.id === 'title' && field.value.length > 100) {
                isValid = false;
                errorMessage = 'Title must be 100 characters or less.';
            }
            break;
            
        case 'textarea':
            if (field.id === 'description' && field.value.length > 500) {
                isValid = false;
                errorMessage = 'Description must be 500 characters or less.';
            }
            break;
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(field) {
    const fieldGroup = field.closest('.form-group');
    const errorElement = document.getElementById(field.id + '-error');
    
    if (fieldGroup) {
        fieldGroup.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    const errorElement = document.getElementById(field.id + '-error');
    
    if (fieldGroup) {
        fieldGroup.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : field.name;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    return validTypes.includes(file.type) && file.size <= maxSize;
}

// File upload functionality
function initFileUpload() {
    const fileInput = document.getElementById('images');
    const uploadArea = document.getElementById('fileUploadArea');
    const previewContainer = document.getElementById('imagePreviewContainer');
    
    let selectedFiles = [];
    
    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // File selection
    fileInput.addEventListener('change', (e) => {
        handleFileSelection(e.target.files);
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFileSelection(e.dataTransfer.files);
    });
    
    function handleFileSelection(files) {
        const newFiles = Array.from(files);
        
        // Validate file count
        if (selectedFiles.length + newFiles.length > 5) {
            showFieldError(fileInput, 'Maximum 5 images allowed.');
            return;
        }
        
        // Validate each file
        for (let file of newFiles) {
            if (!isValidImageFile(file)) {
                showFieldError(fileInput, 'Please upload only JPG, PNG, or WebP images under 5MB.');
                return;
            }
        }
        
        // Add new files
        selectedFiles = [...selectedFiles, ...newFiles];
        updateFileInput();
        updateImagePreviews();
        clearFieldError(fileInput);
    }
    
    function updateFileInput() {
        // Create a new FileList-like object
        const dt = new DataTransfer();
        selectedFiles.forEach(file => dt.items.add(file));
        fileInput.files = dt.files;
    }
    
    function updateImagePreviews() {
        previewContainer.innerHTML = '';
        
        selectedFiles.forEach((file, index) => {
            const preview = createImagePreview(file, index);
            previewContainer.appendChild(preview);
        });
        
        // Update upload area visibility
        if (selectedFiles.length > 0) {
            uploadArea.style.display = 'none';
        } else {
            uploadArea.style.display = 'block';
        }
    }
    
    function createImagePreview(file, index) {
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = `Preview ${index + 1}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-image';
        removeBtn.innerHTML = '×';
        removeBtn.setAttribute('aria-label', `Remove image ${index + 1}`);
        removeBtn.addEventListener('click', () => removeImage(index));
        
        preview.appendChild(img);
        preview.appendChild(removeBtn);
        
        // Add main badge for first image
        if (index === 0) {
            const mainBadge = document.createElement('span');
            mainBadge.className = 'main-badge';
            mainBadge.textContent = 'Main';
            preview.appendChild(mainBadge);
        }
        
        return preview;
    }
    
    function removeImage(index) {
        selectedFiles.splice(index, 1);
        updateFileInput();
        updateImagePreviews();
        
        if (selectedFiles.length === 0) {
            clearFieldError(fileInput);
        }
    }
}

// Dynamic select options
function initDynamicSelects() {
    const categorySelect = document.getElementById('category');
    const typeSelect = document.getElementById('type');
    const sizeSelect = document.getElementById('size');
    
    const typeOptions = {
        men: [
            { value: 'shirt', text: 'Shirt' },
            { value: 'pants', text: 'Pants' },
            { value: 'jacket', text: 'Jacket' },
            { value: 'sweater', text: 'Sweater' },
            { value: 'jeans', text: 'Jeans' },
            { value: 'shorts', text: 'Shorts' },
            { value: 'suit', text: 'Suit' },
            { value: 'tie', text: 'Tie' },
            { value: 'underwear', text: 'Underwear' },
            { value: 'socks', text: 'Socks' }
        ],
        women: [
            { value: 'dress', text: 'Dress' },
            { value: 'blouse', text: 'Blouse' },
            { value: 'skirt', text: 'Skirt' },
            { value: 'pants', text: 'Pants' },
            { value: 'jacket', text: 'Jacket' },
            { value: 'sweater', text: 'Sweater' },
            { value: 'jeans', text: 'Jeans' },
            { value: 'shorts', text: 'Shorts' },
            { value: 'lingerie', text: 'Lingerie' },
            { value: 'activewear', text: 'Activewear' }
        ],
        kids: [
            { value: 'shirt', text: 'Shirt' },
            { value: 'pants', text: 'Pants' },
            { value: 'dress', text: 'Dress' },
            { value: 'jacket', text: 'Jacket' },
            { value: 'sweater', text: 'Sweater' },
            { value: 'shorts', text: 'Shorts' },
            { value: 'pajamas', text: 'Pajamas' },
            { value: 'uniform', text: 'School Uniform' },
            { value: 'costume', text: 'Costume' },
            { value: 'underwear', text: 'Underwear' }
        ],
        accessories: [
            { value: 'bag', text: 'Bag/Purse' },
            { value: 'shoes', text: 'Shoes' },
            { value: 'belt', text: 'Belt' },
            { value: 'hat', text: 'Hat' },
            { value: 'scarf', text: 'Scarf' },
            { value: 'jewelry', text: 'Jewelry' },
            { value: 'watch', text: 'Watch' },
            { value: 'sunglasses', text: 'Sunglasses' },
            { value: 'gloves', text: 'Gloves' },
            { value: 'wallet', text: 'Wallet' }
        ]
    };
    
    const sizeOptions = {
        clothing: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
        shoes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
        accessories: ['one-size']
    };
    
    categorySelect.addEventListener('change', function() {
        const category = this.value;
        updateTypeOptions(category);
        updateSizeOptions(category);
    });
    
    typeSelect.addEventListener('change', function() {
        const type = this.value;
        const category = categorySelect.value;
        updateSizeOptionsForType(category, type);
    });
    
    function updateTypeOptions(category) {
        typeSelect.innerHTML = '<option value="">Select item type</option>';
        
        if (category && typeOptions[category]) {
            typeOptions[category].forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                typeSelect.appendChild(optionElement);
            });
        }
        
        clearFieldError(typeSelect);
    }
    
    function updateSizeOptions(category) {
        updateSizeOptionsForType(category, typeSelect.value);
    }
    
    function updateSizeOptionsForType(category, type) {
        sizeSelect.innerHTML = '<option value="">Select size</option>';
        
        let sizes = [];
        
        if (category === 'accessories') {
            if (type === 'shoes') {
                sizes = sizeOptions.shoes;
            } else {
                sizes = sizeOptions.accessories;
            }
        } else {
            sizes = sizeOptions.clothing;
        }
        
        sizes.forEach(size => {
            const optionElement = document.createElement('option');
            optionElement.value = size;
            optionElement.textContent = size.toUpperCase();
            sizeSelect.appendChild(optionElement);
        });
        
        clearFieldError(sizeSelect);
    }
}

// Character counter
function initCharacterCounter() {
    const descriptionField = document.getElementById('description');
    const charCounter = document.querySelector('.char-counter');
    
    if (descriptionField && charCounter) {
        descriptionField.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 500;
            charCounter.textContent = `${currentLength}/${maxLength} characters`;
            
            if (currentLength > maxLength) {
                charCounter.style.color = '#ef4444';
            } else {
                charCounter.style.color = 'var(--text-secondary)';
            }
        });
    }
}

// Form submission
function initFormSubmission() {
    const form = document.getElementById('itemForm');
    
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const requiredFields = form.querySelectorAll('[required]');
    
    let isFormValid = true;
    
    // Validate all required fields
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        // Scroll to first error
        const firstError = form.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // In a real application, you would send the form data to your server
        console.log('Form submitted successfully!');
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        document.getElementById('imagePreviewContainer').innerHTML = '';
        document.getElementById('fileUploadArea').style.display = 'block';
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }, 2000); // Simulate 2 second upload time
}

function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <h3>🎉 Item Listed Successfully!</h3>
        <p>Your item has been added to the ReWear community. You'll receive notifications when someone shows interest.</p>
    `;
    
    formContainer.insertBefore(successMessage, formContainer.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Tag input enhancement
document.addEventListener('DOMContentLoaded', function() {
    const tagsInput = document.getElementById('tags');
    
    if (tagsInput) {
        tagsInput.addEventListener('input', function() {
            // Auto-format tags (remove extra spaces, convert to lowercase)
            let value = this.value;
            value = value.replace(/\s*,\s*/g, ', '); // Normalize comma spacing
            value = value.replace(/,+/g, ','); // Remove duplicate commas
            
            // Update the input value
            this.value = value;
        });
        
        tagsInput.addEventListener('blur', function() {
            // Clean up tags on blur
            let tags = this.value.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag);
            this.value = tags.join(', ');
        });
    }
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA live region for form errors
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'form-status';
    document.body.appendChild(liveRegion);
    
    // Announce form errors to screen readers
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const errorMessages = document.querySelectorAll('.error-message.show');
                if (errorMessages.length > 0) {
                    const errorText = Array.from(errorMessages).map(el => el.textContent).join('. ');
                    liveRegion.textContent = `Form errors: ${errorText}`;
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
});

// Screen reader only class
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);