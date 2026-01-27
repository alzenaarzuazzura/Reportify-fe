import { useState } from 'react';
import { Button, Modal, Upload, Alert, Typography, Space, Divider } from 'antd';
import { UploadOutlined, FileExcelOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import type { UploadFile } from 'antd/es/upload/interface';

import useImportExcel from '@reportify/hooks/mutations/useImportExcel';

const { Text, Paragraph } = Typography;

type TImportExcelButtonProps = {
  queryKey: string[];
  importFn: (file: File) => Promise<any>;
  templateInfo?: {
    sheetName: string;
    columns: string[];
    fileName: string;
  };
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

const ImportExcelButton = ({
  queryKey,
  importFn,
  templateInfo,
  onSuccess,
  onError,
}: TImportExcelButtonProps) => {
  const intl = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [importResult, setImportResult] = useState<any>(null);

  const { importExcel, isImporting } = useImportExcel({
    queryKey,
    importFn,
    onSuccess: (data) => {
      setImportResult(data?.data);
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      setImportResult(null);
      if (onError) {
        onError(error);
      }
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
    setImportResult(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
    setImportResult(null);
  };

  const handleUpload = () => {
    if (fileList.length === 0) {
      return;
    }

    const file = fileList[0].originFileObj as File;
    importExcel(file);
  };

  const beforeUpload = (file: File) => {
    const isExcel =
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls');

    if (!isExcel) {
      Modal.error({
        title: intl.formatMessage({ id: 'message.invalidFileFormat' }),
        content: intl.formatMessage({ id: 'message.onlyExcelAllowed' }),
      });
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      Modal.error({
        title: intl.formatMessage({ id: 'message.fileTooLarge' }),
        content: intl.formatMessage({ id: 'message.maxFileSize10MB' }),
      });
      return false;
    }

    return false; // Prevent auto upload
  };

  const handleChange = (info: any) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // Keep only the last file
    setFileList(newFileList);
    setImportResult(null);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<UploadOutlined />}
        onClick={showModal}
      >
        {intl.formatMessage({ id: 'button.importExcel' })}
      </Button>

      <Modal
        title={
          <Space>
            <FileExcelOutlined style={{ color: '#52c41a' }} />
            {intl.formatMessage({ id: 'modal.importExcel' })}
          </Space>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            {intl.formatMessage({ id: 'button.cancel' })}
          </Button>,
          <Button
            key="upload"
            type="primary"
            loading={isImporting}
            onClick={handleUpload}
            disabled={fileList.length === 0}
            style={{ background: '#52c41a' }}
          >
            {intl.formatMessage({ id: 'button.upload' })}
          </Button>,
        ]}
        width={700}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {/* Template Info */}
          {templateInfo && (
            <Alert
              message={intl.formatMessage({ id: 'import.templateInfo' })}
              description={
                <Space direction="vertical" size="small">
                  <Text>
                    <strong>{intl.formatMessage({ id: 'import.fileName' })}:</strong>{' '}
                    {templateInfo.fileName}
                  </Text>
                  <Text>
                    <strong>{intl.formatMessage({ id: 'import.sheetName' })}:</strong>{' '}
                    {templateInfo.sheetName}
                  </Text>
                  <Text>
                    <strong>{intl.formatMessage({ id: 'import.columns' })}:</strong>{' '}
                    {templateInfo.columns.join(', ')}
                  </Text>
                </Space>
              }
              type="info"
              icon={<InfoCircleOutlined />}
              showIcon
            />
          )}

          {/* Upload Area */}
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={fileList}
            maxCount={1}
            accept=".xlsx,.xls"
          >
            <Button icon={<UploadOutlined />} block size="large">
              {intl.formatMessage({ id: 'button.selectFile' })}
            </Button>
          </Upload>

          {/* Import Result */}
          {importResult && (
            <>
              <Divider />
              <Alert
                message={intl.formatMessage({ id: 'import.result' })}
                description={
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>
                      <strong>{intl.formatMessage({ id: 'import.total' })}:</strong>{' '}
                      {importResult.summary?.total || 0}
                    </Text>
                    <Text type="success">
                      <strong>{intl.formatMessage({ id: 'import.success' })}:</strong>{' '}
                      {importResult.summary?.success || 0}
                    </Text>
                    <Text type="danger">
                      <strong>{intl.formatMessage({ id: 'import.failed' })}:</strong>{' '}
                      {importResult.summary?.failed || 0}
                    </Text>

                    {/* Show failed items */}
                    {importResult.failed && importResult.failed.length > 0 && (
                      <div style={{ marginTop: 16 }}>
                        <Text strong>{intl.formatMessage({ id: 'import.failedItems' })}:</Text>
                        <div
                          style={{
                            maxHeight: 200,
                            overflowY: 'auto',
                            marginTop: 8,
                            padding: 8,
                            background: '#fff1f0',
                            borderRadius: 4,
                          }}
                        >
                          {importResult.failed.map((item: any, index: number) => (
                            <Paragraph key={index} style={{ margin: 0, fontSize: 12 }}>
                              • {item.nis || item.name || `Row ${index + 1}`}: {item.reason}
                            </Paragraph>
                          ))}
                        </div>
                      </div>
                    )}
                  </Space>
                }
                type={importResult.summary?.failed > 0 ? 'warning' : 'success'}
                showIcon
              />
            </>
          )}
        </Space>
      </Modal>
    </>
  );
};

export default ImportExcelButton;
