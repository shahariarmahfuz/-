    function uploadImage() {
      document.getElementById('file-input').click();
    }

    function handleFiles(files) {
      if (!files.length) return;
      var file = files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = document.createElement('img');
        img.src = e.target.result;
        img.onclick = function() {
          window.open(img.src);
        };
        document.getElementById('article-C').innerHTML = '';
        document.getElementById('article-C').appendChild(img);
        document.getElementById('upload-area').style.display = 'none'; 
      };
      reader.readAsDataURL(file);
    }

    document.getElementById('drag-drop-area').addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.style.borderColor = 'rgba(255, 255, 255, 1)';
    });

    document.getElementById('drag-drop-area').addEventListener('dragleave', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });

    document.getElementById('drag-drop-area').addEventListener('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
      handleFiles(e.dataTransfer.files);
      document.getElementById('file-input').files = e.dataTransfer.files;
    });

    function get_image_link(url) {
      var submit = document.querySelector('.artB-upload');
      var link = document.querySelector('#article-C');
      var p = document.createElement('p');
      p.id = 'link';
      p.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
      link.appendChild(p);
      submit.removeAttribute('disabled');
      submit.classList.remove('loading');
      document.getElementById('loading-indicator').style.display = 'none';
    }

    function submitImage() {
      var submitBtn = document.getElementById('submitBtn');
      submitBtn.setAttribute('disabled', '');
      submitBtn.classList.add('loading', 'disabled');
      document.getElementById('loading-indicator').style.display = 'block';
      var file = document.getElementById('file-input');
      var form = new FormData();
      form.append("image", file.files[0]);

      var settings = {
        "url": "https://api.imgbb.com/1/upload?key=6f034be480c7a511fa505e5b5fdbde5f",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };

      $.ajax(settings).done(function(response) {
        let data = JSON.parse(response);
        let ki = data.data.url;
        get_image_link(ki);
        file.value = '';
      }).fail(function() {
        alert('Image upload failed. Please try again.');
        document.getElementById('loading-indicator').style.display = 'none';
      }).always(function() {
        submitBtn.removeAttribute('disabled');
        submitBtn.classList.remove('loading', 'disabled');
      });
    }
