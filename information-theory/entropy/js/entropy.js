let ready = (callback) => {
    if (document.readyState !== "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {

        // global variables
        const maxWidth = 512;

        // dom
        const canvas = document.getElementById("image");
        const ctx = canvas.getContext('2d');
        const upload = document.getElementById('image-upload');

        // helpers
        function grayscale(imgData) {
            let data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                let red   = data[i];
                let green = data[i+1];
                let blue  = data[i+2];
                let intensity = Math.floor(0.2125 * red + 0.7154 * green + 0.0721 * blue);
                data[i]   = intensity;
                data[i+1] = intensity;
                data[i+2] = intensity;
            }
            imgData.data = data;
            return imgData
        }

        function histogram(data) {
            let x = d3.scaleLinear()
                .domain([0, 255])
            return d3.histogram()
                .domain(x.domain())
                .thresholds(x.ticks(256))(data);
        }

        function imageHist(imgData) {
            // assume grayscale image
            let data = imgData.data;
            let intensities = [];
            for (let i = 0; i < data.length; i += 4) {
                intensities.push(data[i]);
            }
            let hist = histogram(intensities);
            // d3.histogram returns arrays of entries for each bin
            // use length to get count
            hist = hist.map(x => x.length);
            return hist;
        }

        function normalizeHist(hist) {
            let s = d3.sum(hist);
            return hist.map(x => x / s);
        }

        function plotImageHist(hist) {
            let layout = {
                autosize: false,
                width: maxWidth + 2 * 50 + 2 * 4,
                height: maxWidth / 2 + 2 * 100 + 2 * 4,
                margin: {
                    l: 50,
                    r: 50,
                    b: 100,
                    t: 100,
                    pad: 4
                },
                paper_bgcolor: '#f8f8f8',
                plot_bgcolor: '#f8f8f8',
                dragmode: false,
                marker: {
                    color: '#4682b4'
                },
                title: 'Histogram of image intensities',
                xaxis: {title: "Intensity"},
                yaxis: {title: "Log10 Count"}
            };
            let x = d3.range(0, 255, 1);
            let log_hist = hist.map(x => (x == 0) ? 0 : Math.log10(x))
            let data = [{
                x: x,
                y: log_hist,
                type: 'bar',
                opacity: 0.8,
            }];
            Plotly.newPlot('histogram', data, layout);
        }

        function calcEntropy(hist) {
            hist = normalizeHist(hist);
            let e = hist.map(x => x * Math.log2(x));
            return -1 * d3.sum(e);
        }

        // events
        upload.addEventListener("change", function(e){
            let img = new Image();
            img.onload = function() {
                let imgWidth = img.width;
                let imgHeight = img.height;
                let dispWidth, dispHeight;
                if (imgWidth > maxWidth) {
                    dispWidth = maxWidth;
                    dispHeight = Math.floor((dispWidth / imgWidth) * imgHeight);
                } else {
                    dispWidth = imgWidth;
                    dispHeight = imgHeight;
                }
                canvas.width  = dispWidth;
                canvas.height = dispHeight;
                ctx.drawImage(img,0,0, dispWidth, dispHeight);
                let imgData = ctx.getImageData(0, 0, dispWidth, dispHeight);
                imgData = grayscale(imgData);
                ctx.putImageData(imgData,0,0);
                let hist = imageHist(imgData)
                plotImageHist(hist);
                let entropy = calcEntropy(hist);
                let div = document.getElementById('entropy');
                div.innerHTML = "Entropy: " + entropy.toFixed(3).toString();
            };
            img.src = URL.createObjectURL(e.target.files[0]);
        });
});
