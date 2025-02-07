import Icons from '../../../icons'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Slider } from 'baseui/slider'
import { useHandlers } from '@/uibox'
import { useEffect, useState } from 'react'
import { useActiveObject } from '@/uibox/hooks/useActiveObject'

function Opacity() {
  const [value, setValue] = useState([1])
  const activeObject = useActiveObject()
  const handlers = useHandlers()

  useEffect(() => {
    updateOptions(activeObject)
  }, [activeObject])

  useEffect(() => {
    handlers.canvasHandler.canvas.on('history:changed', () => {
      updateOptions(activeObject)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlers])

  const updateOptions = (object: fabric.IObjectOptions) => {
    const updatedValue = [object.opacity * 100]
    setValue(updatedValue)
  }

  const updateOpacity = (value: number[]) => {
    const opacityValue = value[0] / 100
    handlers.objectsHandler.updateActive({ opacity: opacityValue })
  }

  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      content={({ close }) => (
        <div
          style={{
            width: '380px',
            background: '#ffffff',
            fontFamily: 'Uber Move Text',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '1.5rem 2rem',
              alignItems: 'center',
            }}
          >
            <div>Transparency</div>
            <Slider
              overrides={{
                InnerThumb: () => null,
                ThumbValue: () => null,
                TickBar: () => null,
                Thumb: {
                  style: {
                    height: '20px',
                    width: '20px',
                  },
                },
              }}
              min={0}
              max={100}
              marks={false}
              value={value}
              onChange={({ value }) => updateOpacity(value)}
            />
            <div>{Math.round(value[0])}</div>
          </div>
        </div>
      )}
    >
      <Button size={SIZE.default} kind={KIND.tertiary} shape={SHAPE.square}>
        <Icons.Opacity size={24} />
      </Button>
    </StatefulPopover>
  )
}

export default Opacity
