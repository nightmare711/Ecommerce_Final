/**
 *
 * base64.js
 * this helper formulate buffer data to base64 string
 */

export const arrayBufferToBase64 = buffer => {
  let binary = '';
  let bytes = [].slice.call(new Uint8Array(buffer.data.data));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return `data:${buffer.contentType};base64,${window.btoa(binary)}`;
};

export const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})