$(() => {
  const $canvas = $('#canvas');
  const $form = $('form');
  const $start = $('#animate');
  const $stop = $('#stop');

  $form.on('submit', (e) => {
    e.preventDefault();

    const formData = new FormData($form[0]);
    const startX = (formData.get('start_x') || 0) + 'px';
    const startY = (formData.get('start_y') || 0) + 'px';
    const endX = (formData.get('end_x') || 0) + 'px';
    const endY = (formData.get('end_y') || 0) + 'px';
    const duration = formData.get('duration') || '1000';

    $('<div></div>', {
      class: formData.get('shape_type'),
      data: {
        startX,
        startY,
        endX,
        endY,
        duration,
      },
      css: {
        left: startX,
        top: startY,
      },
    }).appendTo($canvas);
  });

  $start.on('click', (e) => {
    e.preventDefault();

    $canvas.find('div').finish().each((_, elem) => {
      const $elem = $(elem);

      $elem.css({
        left: $elem.data('startX'),
        top: $elem.data('startY'),
      }).animate({
        left: $elem.data('endX'),
        top: $elem.data('endY'),
      }, +$elem.data('duration'));
    });
  });

  $stop.on('click', (e) => {
    e.preventDefault();
    $canvas.find('div').stop();
  });
});
