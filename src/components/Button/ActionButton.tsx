import { Icon } from "@iconify/react";
import { Button, Col, Dropdown, MenuProps, Row, RowProps } from "antd";
import { ReactNode } from "react";
import { useIntl } from "react-intl";

export type TActionsButton = RowProps & {
    editButton?: boolean
    moreMenu?: MenuProps
    children?: ReactNode
    onEdit?: () => void
}

const ActionsButton = ({
    editButton = false,
    moreMenu,
    children,
    onEdit,
    ...props
}: TActionsButton) => {
    const intl = useIntl()

    const renderEditButton = () => {
        if (editButton) {
            return (
                <Col>
                    <Button icon={<Icon icon='lucide:edit' />} type="primary" onClick={onEdit}>
                        {intl.formatMessage({ id: 'button.edit' })}
                    </Button>
                </Col>
            )
        }
    }

    const renderMoreMenu = () => {
        if (moreMenu) {
            return (
                <Col>
                    <Dropdown
                        menu={moreMenu ?? { items: [] }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Button icon={<Icon icon="lucide:more-horizontal" />}>
                            {intl.formatMessage({ id: 'button.other' })}
                        </Button>
                    </Dropdown>
                </Col>
            )
        }

        return null
    }

    return (
        <Row className="mb-3" gutter={[16, 16]} justify='end' {...props}>
            {renderEditButton()}
            {renderMoreMenu()}
            {children}
        </Row>
    )
}

export default ActionsButton